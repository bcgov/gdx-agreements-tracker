// import knex database connection and utilities
const { knex } = require("@database/databaseConnection")();
const { groupByProperty } = require("../../controllers/reports/helpers");
const _ = require("lodash");

/**
 *
 * Retrieves Annual stats report on all Contracts showing number of contracts, total contracted amount, average duration, # of amendments, # with amendments, # of resources.
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
            COUNT(*) fixed_price_resource_count
          FROM contract_resource
          WHERE hours IS NULL
          GROUP BY contract_id`)
      )
      .with(
        "fixed_price_invoice_total",
        knex.raw(`
          SELECT i.contract_id,
            SUM(id.unit_amount * id.rate) fixed_price_amount
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
            SUM(deliverable_amount) deliverable_total
          FROM contract_deliverable
          WHERE deliverable_amount IS NOT NULL
            AND is_expense = FALSE
          GROUP BY contract_id`)
      )
      .with(
        "contract_portfolio",
        knex.raw(`
          SELECT contract_id,
            MIN(portfolio_id) port_id
          FROM sid_internal_coding
          GROUP BY contract_id`)
      )
      .with(
        "q4",
        knex.raw(`
        SELECT 
          fiscal_year_id, 
          fiscal_year, 
          co_number, 
          portfolio_abbrev, 
          resource_type, 
          resource_count, 
          invoiced / SUM(resource_count) OVER (PARTITION BY co_number) * resource_count allocated_contract_amount 
        FROM 
          (
            SELECT 
              fy.id fiscal_year_id, 
              fy.fiscal_year, 
              c.co_number, 
              po.portfolio_abbrev, 
              rt.resource_type, 
              COUNT(*) resource_count, 
              c.invoiced 
            FROM 
              historical_contracts c 
              INNER JOIN historical_contract_assignments ca ON c.co_number = ca.co_number 
              INNER JOIN resource_type rt ON ca.resource_type_id = rt.id 
              INNER JOIN portfolio po ON c.portfolio_id = po.id 
              INNER JOIN fiscal_year fy ON c.fiscal_year = fy.id 
            GROUP BY 
              fy.id, 
              fy.fiscal_year, 
              c.co_number, 
              po.portfolio_abbrev, 
              rt.resource_type, 
              c.invoiced
          ) a 
        ORDER BY 
          co_number`)
      )
      .with(
        "q3",
        knex.raw(`
        SELECT 
          cr.contract_id, 
          c.co_number, 
          c.total_fee_amount, 
          po.portfolio_name, 
          po.portfolio_abbrev, 
          rt.resource_type, 
          fy.fiscal_year, 
          CASE WHEN cr.hours IS NULL THEN -1 ELSE 0 END FIXED, 
          SUM(id.unit_amount * id.rate) hourly_fees, 
          fpit.fixed_price_amount, 
          count(*) resource_count, 
          fprc.fixed_price_resource_count, 
          fpit.fixed_price_amount * cast(
            COUNT(*) AS float
          ) / fprc.fixed_price_resource_count allocated_deliverable_total 
        FROM 
          contract c 
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
        GROUP BY 
          cr.contract_id, 
          c.co_number, 
          c.total_fee_amount, 
          po.portfolio_name, 
          po.portfolio_abbrev, 
          rt.resource_type, 
          fy.fiscal_year, 
          CASE WHEN cr.hours IS NULL THEN -1 ELSE 0 END, 
          fpit.fixed_price_amount, 
          fprc.fixed_price_resource_count`)
      )
      .with(
        "q2",
        knex.raw(`
        SELECT 
          fy.id AS fiscal_year_id, 
          fy.fiscal_year AS fy, 
          q3.co_number, 
          q3.portfolio_abbrev, 
          q3.resource_type, 
          q3.resource_count, 
          COALESCE(
            hourly_fees, 
            CAST(0 AS MONEY)
          )+ COALESCE(
            allocated_deliverable_total, 
            CAST(0 AS MONEY)
          ) AS allocated_amount 
        FROM 
          (
            q3 
            INNER JOIN contract c ON q3.contract_id = c.id
          ) 
          INNER JOIN fiscal_year fy ON c.fiscal = fy.id 
        UNION 
        SELECT 
          fiscal_year_id, 
          fiscal_year, 
          co_number, 
          portfolio_abbrev, 
          resource_type, 
          resource_count, 
          allocated_contract_amount 
        FROM 
          q4`)
      )
      .with(
        "q1",
        knex.raw(`
        SELECT 
          q2.fiscal_year_id, 
          q2.fy, 
          q2.resource_type, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'OSS' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS oss, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'DES' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS des, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'DMS' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS dms, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'DP' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS dp, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'ANA' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS ana, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'SD' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS sd, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'CE' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS ce, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'EDS' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS eds, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'BCS' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS bcs, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'DIV' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS div, 
          SUM(
            CASE WHEN q2.portfolio_abbrev = 'GC' THEN ROUND(
              CAST(allocated_amount AS NUMERIC), 
              2
            ) ELSE 0 END
          ) AS gc, 
          SUM(q2.resource_count) AS total_resource_count 
        FROM 
          q2 
        GROUP BY 
          q2.fiscal_year_id, 
          q2.fy, 
          q2.resource_type`)
      )
      .select({
        fiscal: "fiscal_year_id",
        fy: "fy",
        resource_type: "resource_type",
        bcs: knex.raw("CAST(bcs AS MONEY)"),
        oss: knex.raw("CAST(oss AS MONEY)"),
        des: knex.raw("CAST(des AS MONEY)"),
        dp: knex.raw("CAST(dp AS MONEY)"),
        ana: knex.raw("CAST(ana AS MONEY)"),
        dms: knex.raw("CAST(dms AS MONEY)"),
        sd: knex.raw("CAST(sd AS MONEY)"),
        ce: knex.raw("CAST(ce AS MONEY)"),
        gc: knex.raw("CAST(gc AS MONEY)"),
        total: knex.raw(`
        CAST(
          (
            bcs + oss + des + dp + ana + dms + sd + ce + gc
          ) AS MONEY
        )`),
      })
      .from("q1")
      .where("fiscal_year_id", ">=", fiscal)
      .orderBy("fy", "resource_type"),

  // Subtotals for each fiscal year.
  totals: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .select({
        fy: "fy",
      })
      .sum(queries.columns)
      .groupBy("fy"),

  columns: {
    bcs: "bcs",
    oss: "oss",
    des: "des",
    dp: "dp",
    ana: "ana",
    dms: "dms",
    sd: "sd",
    ce: "ce",
    gc: "gc",
    total: "total",
  },

  // Grand totals.
  grandTotals: (fiscal) => knex(queries.report(fiscal).as("report")).sum(queries.columns),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options        - Options object containing fiscal year.
 * @param   {string} options.fiscal - The fiscal year to retrieve data for.
 * @returns {object}                - An object containing fiscal year, report, and report total.
 */
// add other parameters if needed, like quarter, portfolio, date etc.
const getAll = async ({ fiscal }) => {
  // Await all promises in parallel
  const [{ fiscal_year }, report, totals, grandTotals] = await Promise.all([
    queries.fiscal(fiscal),
    queries.report(fiscal),
    queries.totals(fiscal),
    queries.grandTotals(fiscal),
  ]);

  // Restructure data to allow for grouping by fiscal
  const reportByFiscal = groupByProperty(report, "fy");
  const totalsByFiscal = _.keyBy(totals, "fy");
  const reportsByFiscalWithTotals = _.map(reportByFiscal, (fiscal) => ({
    ...fiscal,
    fiscal_totals: totalsByFiscal[fiscal.fy],
  }));

  return { fiscal_year, reportsByFiscalWithTotals, grandTotals };
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["fiscal"], getAll };
