/**
 * A GENERIC MODEL STARTER TEMPLATE FOR FUTURE REPORT
 *
 * This should generate a 'fiscal year' table in the backend console out-of-the box
 * THIS HELPS WITH STEP 2 of building a report: getting the backend to generate a JSON object and blank .excel document
 * you can adapt this to help structure your model.
 * this is based on Tab_20_rpt_PA_Billed.js AND Tab_50_rpt_PF_NetRecoverySummaryByQuarter.js:w
 *
 * This template tries to just use the raw query, but look at tab 20 or tab 21 if you want
 * to wrap it further in knex() methods.
 *
 */

// libs
const { knex } = require("@database/databaseConnection")();
// const _ = require("lodash"); // for data-type-agnostic list processing

// utils
// const { groupByProperty } = require("@controllers/helpers");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: ({ fiscal }) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: ({ PARAMETER }) =>
    knex
      .select()
      .fromRaw(
        `
        (
        ) as base`
      )
      .where({
        PARAMETER: PARAMETER,
      }),

  totals: (PARAMETER) =>
    knex
      .select()
      .fromRaw(
        `
        (
        ) as base`
      )
      .where({
        PARAMETER: PARAMETER,
      })
      .sum({
        total: "<total column name>",
      }),
};

module.exports = {
  required: ["fiscal", "<some other parameter>"], // e.g. fiscal, date, or portfolio

  // if 2nd parameter needed, replace the second parameter with quarter, portfolio, date etc.
  getAll: async ({ fiscal, PARAMETER }) => {
    try {
      // Use Promise.all to execute all three queries in parallel, providing the 'fiscal' parameter.
      const fetchedQueryResults = await Promise.all([
        queries?.fiscal({ fiscal }),
        queries?.report({ fiscal, PARAMETER }),
        queries?.totals({ fiscal, PARAMETER }),
      ]);

      // Extract the results from the fetched Query Results into individual variables
      const [
        { fiscal_year }, // the result of the 'fiscal' query
        report, // the result of the 'report' query
        totals, // the result of the 'totals' query
      ] = fetchedQueryResults;

      // create a result object with the fetched data for each section of the report
      // can shape the result as required, e.g. using map or groupByProperty to add sections
      const shapedResult = {
        fiscal: fiscal_year,
        report,
        totals,
        // add more here, such as 'grand_totals'
      };

      // Log the result object in a readable format to the console.
      // todo: remove this once we hit MVP by mid-September.
      console.warn(JSON.stringify(shapedResult, null, 2));

      // finally, return the shaped result
      return shapedResult;
    } catch (error) {
      console.error(`
        Model error!:
        query parameter received: ${JSON.stringify(fiscal)}
        **** ${error} ****
        returning NULL!.
      `);

      return null;
    }
  },
};
