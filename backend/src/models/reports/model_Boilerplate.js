/**
 * A GENERIC MODEL STARTER TEMPLATE FOR FUTURE REPORT
 *
 * for a working example, look at: backend/src/models/reports/Tab_44_rpt_PF_RecoveryToDateDetails.js
 *
 */

// Libs
const { knex } = require("@database/databaseConnection")();

/* optional: break up the queries into base query and main query */
// const baseQueries = {
//   q1: knex.raw(
//     `(

//     ) as q1`
//   ),
//   q2: knex.raw(
//     `(

//     ) as q2`
//   ),
// };

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // can reference sub-queries here if you want to break up the query into parts for easy reading
  main: knex.raw(
    `(

    ) as base`
  ),

  report: (fiscal) => knex.from(queries.main).where({ fiscal_year: fiscal }),

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

module.exports = {
  // constant to hold the argument passed to getAll()
  required: ["fiscal"], //  fiscal, date, portfolio, etc.

  // add other parameters if needed, like quarter, portfolio, date etc.
  getAll: async ({ fiscal }) => {
    try {
      // Await all promises in parallel
      const [{ fiscal_year }, report, totals] = await Promise.all([
        queries.fiscal(fiscal),
        queries.report(fiscal),
        queries.totals(fiscal),
      ]);

      return {
        fiscal_year,
        report,
        totals,
      };
    } catch (error) {
      console.error(`
        **** MODEL ERROR ****
        ${error}
      `);
    }
  },
};
