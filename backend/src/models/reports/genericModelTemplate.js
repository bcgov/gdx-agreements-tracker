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

  // wait for all the promises to return in parallel, then send them to the controller
  // if 2nd parameter needed, replace the second parameter with quarter, portfolio, date etc.
  getAll: async ({ fiscal, PARAMETER }) => ({
    fiscal: await queries?.fiscal({ fiscal }),
    report: await queries?.report({ fiscal, PARAMETER }),
    totals: await queries?.totals({ fiscal, PARAMETER }),
  }),
};
