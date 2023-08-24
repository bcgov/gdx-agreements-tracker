/**
 * A GENERIC MODEL STARTER TEMPLATE FOR FUTURE REPORT
 *
 * for a working example, look at: backend/src/models/reports/Tab_44_rpt_PF_RecoveryToDateDetails.js
 *
 */

// Libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal) =>
    knex
      .with(
        // can chain together multiple with statements
        "q1",
        knex.raw(`
    --example query
    `)
      )
      .select({
        // example columns
      })
      .from("q1")
      .where({ fiscal_year: fiscal }),

  totals: (fiscal) =>
    knex(queries.report(fiscal).as("report")).sum({
      /* example columns
      total_project_budget: "total_project_budget",
      total_contract: "total_contract",
      recoverable_amt: "recoverable_amt",
      recoveries_to_date: "recoveries_to_date",
      balance_remaining: "balance_remaining",
      */
    }),
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
  try {
    // Await all promises in parallel
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
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["fiscal"], getAll };
