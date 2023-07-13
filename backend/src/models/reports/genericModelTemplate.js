/**
 * A GENERIC MODEL STARTER TEMPLATE FOR FUTURE REPORTs
 * you can adapt this to help structure your model.
 * this is based on Tab_20_rpt_PA_Billed.js AND Tab_50_rpt_PF_NetRecoverySummaryByQuarter.js:w
 *
 */
// libs
const { knex } = require("@database/databaseConnection")();

// Constants
// eslint-disable-next-line no-unused-vars
const PARAMETER = "someParameter";

/**
 * Base query to re-use for report & report totals
 *
 * @param   {number | string | Array} parameter from the frontend, e.g.: Date, Portfolio(s), fiscal_year, or the like
 * @returns {Knex.QueryBuilder}                 Knex query builder for fetching report totals.
 */
const baseQuery = knex("<tableName>")
  .select({
    someColumn: "<some value>",
  })
  .leftJoin("<some table and criteria>")
  .groupBy("<some criteria>")
  .orderBy("P.project_number", "asc");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const reportQueries = {
  fiscalYear: (PARAMETER) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", PARAMETER).first(),

  report: (PARAMETER) =>
    knex.select("something").from(baseQuery.as("base")).where("someColumn", PARAMETER),

  report_totals: (PARAMETER) =>
    knex.from(baseQuery.as("base")).sum("someColumn").where("someColumn", PARAMETER),
};

module.exports = {
  required: ["PARAMETER"], // e.g. fiscal, date, or portfolio
  getAll: async ({ PARAMETER }) => {
    const [{ fiscal_year }, report, report_totals] = await Promise.all([
      reportQueries.fiscalYear(PARAMETER),
      reportQueries.report(PARAMETER),
      reportQueries.report_totals(PARAMETER),
    ]);

    return { fiscal_year, report, report_totals };
  },
};
