// import knex database connection and utilities
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const _ = require("lodash");

/**
 *
 * Retrieves invoiced amount towards each type of contract resource
 * (Application Design-Development, Application Management, Architecture,
 * Business Analysis and Process Consultation etc.)
 * Based on the Competencies in the SRI
 *
 * @param   {number}               fiscal - The fiscal year to grab data for
 * @returns {Promise<{report: *}>}
 */
const queries = {
  // returns the fiscal year.
  fiscal_year: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // returns the report data.
  report: (fiscal) =>
    knex
      .with(
        "q1",
        knex.raw(`
        SELECT 
          c.fiscal, 
          fy.fiscal_year, 
          c.supplier_id, 
          s.supplier_name, 
          p.portfolio_abbrev AS portfolio, 
          c.co_number, 
          SUM(unit_amount * rate) AS total_invoiced 
        FROM 
          (
            portfolio p 
            INNER JOIN (
              (
                (
                  (
                    supplier s 
                    RIGHT JOIN contract c ON s.id = c.supplier_id
                  ) 
                  INNER JOIN invoice i ON c.id = i.contract_id
                ) 
                INNER JOIN invoice_detail id ON i.id = id.invoice_id
              ) 
              INNER JOIN sid_internal_coding sic ON c.id = sic.contract_id
            ) ON p.id = sic.portfolio_id
          ) 
          INNER JOIN fiscal_year fy ON c.fiscal = fy.id 
        GROUP BY 
          c.fiscal, 
          fy.fiscal_year, 
          c.supplier_id, 
          s.supplier_name, 
          c.co_number, 
          p.portfolio_abbrev 
        UNION 
        SELECT 
          hc.fiscal_year, 
          fy.fiscal_year, 
          hc.supplier_id, 
          s.supplier_name, 
          p.portfolio_abbrev, 
          hc.co_number, 
          hc.invoiced 
        FROM 
          (
            supplier s 
            INNER JOIN (
              fiscal_year fy 
              INNER JOIN historical_contracts hc ON fy.id = hc.fiscal_year
            ) ON s.id = hc.supplier_id
          ) 
          INNER JOIN portfolio p ON hc.portfolio_id = p.id`)
      )
      .with(
        "q2",
        knex.raw(`
        SELECT 
          q1.fiscal, 
          q1.fiscal_year, 
          q1.supplier_id, 
          q1.supplier_name, 
          SUM(
            CASE WHEN q1.portfolio = 'OSS' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) as oss, 
          SUM(
            CASE WHEN q1.portfolio = 'DES' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS des, 
          SUM(
            CASE WHEN q1.portfolio = 'DMS' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) as dms, 
          SUM(
            CASE WHEN q1.portfolio = 'DP' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS dp, 
          SUM(
            CASE WHEN q1.portfolio = 'ANA' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS ana, 
          SUM(
            CASE WHEN q1.portfolio = 'SD' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS sd, 
          SUM(
            CASE WHEN q1.portfolio = 'CE' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS ce, 
          SUM(
            CASE WHEN q1.portfolio = 'EDS' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) as eds, 
          SUM(
            CASE WHEN q1.portfolio = 'BCS' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS bcs, 
          SUM(
            CASE WHEN q1.portfolio = 'DIV' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS div, 
          SUM(
            CASE WHEN q1.portfolio = 'GC' THEN q1.total_invoiced ELSE CAST(0 AS MONEY) END
          ) AS gc 
        FROM 
          q1 
        WHERE 
          (
            (
              (q1.fiscal_year)= '15-16'
            ) 
            AND (
              (q1.supplier_name) IN ('cgi', 'sierra', 'fujitsu')
            )
          ) 
        GROUP BY 
          q1.fiscal, 
          q1.fiscal_year, 
          q1.supplier_id, 
          q1.supplier_name`)
      )
      .select({
        supplier_name: "supplier_name",
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
      .from("q2")
      .where("q1.fiscal", fiscal)
      .orderBy("supplier_name"),

  // returns the report total.
  report_total: (fiscal) =>
    knex(queries.report(fiscal).as("report")).sum({ report_total: "total" }).first(),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options        - Options object containing fiscal year.
 * @param   {string} options.fiscal - The fiscal year to retrieve data for.
 * @returns {object}                - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ fiscal }) =>
  // Retrieve data from queries and process it into a structured object
  await Promise.all(
    // Map each query promise (simultaneously) to its execution with the 'fiscal' parameter.
    _.map(queries, (queryPromise) => queryPromise(fiscal))
  )
    .then(
      // Destructure the results array to extract individual components
      ([{ fiscal_year }, report, { report_total }]) =>
        // Combine the extracted components into an object
        ({
          fiscal_year,
          report,
          report_total,
        }) // implicit return
    )
    // Catch, then throw the error to be caught by the controller.
    .catch((error) => {
      log.error(error);
      throw error;
    });

// Export the functions to be used in controller.
module.exports = { required: ["fiscal"], getAll };
