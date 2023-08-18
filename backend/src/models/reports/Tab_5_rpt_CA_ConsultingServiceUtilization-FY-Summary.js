const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

/**
 * Retrieves Summary stats report for types of contract resources we have engaged on CO’s. Information based on data from 14-15 forward. Shows distribution over the various Portfolios.
 *
 * @param   {number}               fiscal - The fiscal year to grab data for
 * @returns {Promise<{report: *}>}
 */
const reportQueries = {
  // The fiscal year to grab data for.
  fiscal_year: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal) =>
    knex
      .with(
        "fixed_price_resource_count",
        knex.raw(
          `SELECT contract_id,
          count(*) fixed_price_resource_count
        FROM contract_resource
        WHERE hours IS NULL
        GROUP BY contract_id`
        )
      )
      .with(
        "fixed_price_invoice_total",
        knex.raw(
          `SELECT i.contract_id,
          sum(id.unit_amount * id.rate) fixed_price_amount
        FROM invoice i
          INNER JOIN invoice_detail id ON i.id = id.invoice_id
          INNER JOIN contract_deliverable cd ON id.contract_deliverable_id = cd.id
        WHERE cd.is_expense = FALSE
        GROUP BY i.contract_id`
        )
      )
      .with(
        "contract_deliverable_fee_total",
        knex.raw(
          `SELECT contract_id,
          sum(deliverable_amount) deliverable_total
        FROM contract_deliverable
        WHERE deliverable_amount IS NOT NULL
          AND is_expense = FALSE
        GROUP BY contract_id`
        )
      )
      .with(
        "contract_portfolio",
        knex.raw(
          `SELECT contract_id,
          min(portfolio_id) port_id
        FROM sid_internal_coding
        GROUP BY contract_id`
        )
      )
      .with(
        "q1",
        knex.raw(
          `SELECT cr.contract_id,
          c.co_number,
          c.total_fee_amount,
          po.portfolio_name,
          po.portfolio_abbrev,
          rt.resource_type,
          fy.fiscal_year,
          CASE
            WHEN cr.hours IS NULL THEN -1
            ELSE 0
          END fixed,
          sum(id.unit_amount * id.rate) hourly_fees,
          fpit.fixed_price_amount,
          count(*) resource_count,
          fprc.fixed_price_resource_count,
          fpit.fixed_price_amount * cast(count(*) AS float) / fprc.fixed_price_resource_count allocated_deliverable_total,
          c.fiscal
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
          CASE
            WHEN cr.hours IS NULL THEN -1
            ELSE 0
          END,
          fpit.fixed_price_amount,
          fprc.fixed_price_resource_count,
          c.fiscal`
        )
      )
      .select({
        resource_type: "resource_type",
        total: knex.raw(`
        sum(coalesce( hourly_fees, 0::MONEY + coalesce( allocated_deliverable_total, 0::MONEY)))
        `),
      })
      .from("q1")
      .where("q1.fiscal", fiscal)
      .groupBy("resource_type")
      .orderBy("resource_type"),

  // totals for the report columns.
  totals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report")).sum(reportQueries.columns).first(),
  // The columns on which to calculate totals.
  columns: {
    total: "total",
  },
};

// return the model data
module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    try {
      const [{ fiscal_year }, report, report_totals] = await Promise.all([
        reportQueries.fiscal_year(fiscal),
        reportQueries.report(fiscal),
        reportQueries.totals(fiscal),
      ]);

      return { fiscal_year, report, report_totals };
    } catch (error) {
      log.error(error);
    }
  },
};
