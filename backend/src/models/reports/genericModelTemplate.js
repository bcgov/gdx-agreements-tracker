/**
 * A GENERIC MODEL STARTER TEMPLATE FOR FUTURE REPORT
 *
 * This should generate a 'fiscal year' table in the backend console out-of-the box
 * THIS HELPS WITH STEP 2 of building a report: getting the backend to generate a JSON object and blank .excel document
 * you can adapt this to help structure your model.
 * this is based on Tab_20_rpt_PA_Billed.js AND Tab_50_rpt_PF_NetRecoverySummaryByQuarter.js:w
 *
 */
// libs
const { knex } = require("@database/databaseConnection")();

/**
 * Base query to re-use for report & report totals
 *
 * @param   {number | string | Array} parameter from the frontend, e.g.: Date, Portfolio(s), fiscal_year, or the like
 * @returns {Knex.QueryBuilder}                 Knex query builder for fetching report totals.
 */
/*
const baseQuery = knex("jv")
  .select({
    fy: "fiscal_year_id",
    fiscal_year: "fiscal_year.fiscal_year",
    project_number: "P.project_number",
    project_name: "P.project_name",
  })
  .leftJoin("project AS P", "P.id", "jv.project_id")
  .groupBy("fiscal_year_id", "fiscal_year.fiscal_year", "P.project_number", "P.project_name")
  .orderBy("P.project_number", "asc")
  .orderBy("fiscal_year", "desc");
 */

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
  /*
  report: (PARAMETER) =>
    knex.select("something").from(baseQuery.as("base")).where("someColumn", PARAMETER),

  report_totals: (PARAMETER) =>
    knex.from(baseQuery.as("base")).sum("someColumn").where("someColumn", PARAMETER),
    */
};

module.exports = {
  required: ["fiscal"], // e.g. fiscal, date, or portfolio
  getAll: async ({ fiscal }) => {
    const [{ fiscal_year } /*, report, report_totals*/] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      /*
      reportQueries.report(PARAMETER),
      reportQueries.report_totals(PARAMETER),
      */
    ]);

    const reportData = { fiscal_year /*report, report_totals */ };
    console.warn(JSON.stringify(reportData, null, 2));

    return reportData;
  },
};
