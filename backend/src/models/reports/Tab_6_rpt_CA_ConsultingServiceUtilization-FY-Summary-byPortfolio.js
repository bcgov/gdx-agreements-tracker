// import knex database connection and utilities
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

/**
 *
 * Retrieves Summary stats report for types of contract resources we have engaged on CO’s.
 * Information based on data from 14-15 forward. Shows distribution over the various Portfolios.
 *
 * @param   {number}               fiscal - The fiscal year to grab data for
 * @returns {Promise<{report: *}>}
 */
const queries = {
  // returns the fiscal year.
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // returns the report data.
  report: (fiscal) =>
    knex
      .with(
        "fixed_price_resource_count",
        knex.raw(`
          SELECT contract_id,
            count(*) fixed_price_resource_count
          FROM contract_resource
          WHERE hours IS NULL
          GROUP BY contract_id`)
      )
      .with(
        "fixed_price_invoice_total",
        knex.raw(`
          SELECT i.contract_id,
            sum(id.unit_amount * id.rate) fixed_price_amount
          FROM invoice i
            INNER JOIN invoice_detail id ON i.id = id.invoice_id
            INNER JOIN contract_deliverable cd ON id.contract_deliverable_id = cd.id
          WHERE cd.is_expense = FALSE
          GROUP BY i.contract_id`)
      )
      .with(
        "contract_deliverable_fee_total",
        knex.raw(`
          SELECT contract_id,
            sum(deliverable_amount) deliverable_total
          FROM contract_deliverable
          WHERE deliverable_amount IS NOT NULL
            AND is_expense = FALSE
          GROUP BY contract_id`)
      )
      .with(
        "contract_portfolio",
        knex.raw(`
          SELECT contract_id,
            min(portfolio_id) port_id
          FROM sid_internal_coding
          GROUP BY contract_id`)
      )
      .with(
        "q1",
        knex.raw(`
          SELECT cr.contract_id,
            c.co_number,
            c.total_fee_amount,
            po.portfolio_name,
            po.portfolio_abbrev,
            rt.resource_type,
            fy.fiscal_year,
            fy.id as fiscal,
            CASE
              WHEN cr.hours IS NULL THEN TRUE
              ELSE FALSE
            END fixed,
            sum(id.unit_amount * id.rate) hourly_fees,
            fpit.fixed_price_amount,
            count(*) resource_count,
            fprc.fixed_price_resource_count,
            fpit.fixed_price_amount * cast(count(*) AS float) / fprc.fixed_price_resource_count allocated_deliverable_total
          FROM contract c
            INNER JOIN fiscal_year fy ON c.fiscal = fy.id
            INNER JOIN contract_resource cr ON c.id = cr.contract_id
            INNER JOIN supplier_rate sr ON cr.supplier_rate_id = sr.id
            INNER JOIN resource_type rt ON sr.resource_type_id = rt.id
            INNER JOIN contract_portfolio cp ON c.id = cp.contract_id
            INNER JOIN portfolio po ON cp.port_id = po.id
            LEFT JOIN invoice_detail id ON cr.id = id.contract_resource_id
            LEFT JOIN fixed_price_resource_count fprc ON c.id = fprc.contract_id
            LEFT JOIN fixed_price_invoice_total fpit ON c.id = fpit.contract_id
            LEFT JOIN contract_deliverable_fee_total cdft ON c.id = cdft.contract_id
          GROUP BY cr.contract_id,
            c.co_number,
            c.total_fee_amount,
            po.portfolio_name,
            po.portfolio_abbrev,
            rt.resource_type,
            fy.fiscal_year,
            fy.id,
            CASE
              WHEN cr.hours IS NULL THEN TRUE
              ELSE FALSE
            END,
            fpit.fixed_price_amount,
            fprc.fixed_price_resource_count,
            c.fiscal`)
      )
      .with(
        "q2",
        knex.raw(`
        SELECT q1.fiscal_year,
          q1.fiscal,
          q1.resource_type,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'BCF' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS bcf,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'OSS' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS oss,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'DES' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS des,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'DP' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS dp,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'ANA' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS ana,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'DMS' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS dms,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'SD' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS sd,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'CE' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS ce,
          sum(
            CASE
              WHEN q1.portfolio_abbrev = 'GC' THEN coalesce(
                hourly_fees,
                cast(0 AS MONEY) + coalesce(
                  allocated_deliverable_total,
                  cast(0 AS MONEY)
                )
              )
              ELSE NULL
            END
          ) AS gc
        FROM q1
        GROUP BY q1.fiscal_year,
          q1.fiscal,
          q1.resource_type`)
      )
      .select({
        resource_type: "resource_type",
        bcf: "q2.bcf", // Business Consulting and Facilitation
        oss: "q2.oss", // Operational Support Services (OSS)
        des: "q2.des", // Design Services
        dp: "q2.dp", // Digital Products
        ana: "q2.ana", // Analytics
        dms: "q2.dms", // Data Management Services
        sd: "q2.sd", // Strategic Direction
        ce: "q2.ce", // Communications and Engagement
        gc: "q2.gc", // Governance and Coordination
        total: knex.raw(`
          cast(
            coalesce(q2.bcf::numeric, 0) + coalesce(q2.oss::numeric, 0) + coalesce(q2.des::numeric, 0) + coalesce(q2.dp::numeric, 0) + coalesce(q2.ana::numeric, 0) + coalesce(q2.dms::numeric, 0) + coalesce(q2.sd::numeric, 0) + coalesce(q2.ce::numeric, 0) + coalesce(q2.gc::numeric, 0) AS MONEY
          )
        `),
        fiscal_year: "q2.fiscal_year",
        fiscal: "q2.fiscal",
      })
      .from("q2")
      .where("fiscal", fiscal)
      .orderBy("resource_type"),

  // returns the report total.
  totals: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .sum({
        bcf: "bcf",
        oss: "oss",
        des: "des",
        dp: "dp",
        ana: "ana",
        dms: "dms",
        sd: "sd",
        ce: "ce",
        gc: "gc",
        total: "total",
      })
      .first(),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options        - Options object containing fiscal year.
 * @param   {string} options.fiscal - The fiscal year to retrieve data for.
 * @returns {object}                - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ fiscal }) => {
  try {
    const [{ fiscal_year }, report, totals] = await Promise.all([
      queries.fiscal(fiscal),
      queries.report(fiscal),
      queries.totals(fiscal),
    ]);

    return { fiscal_year, report, totals };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
module.exports = { required: ["fiscal"], getAll };
