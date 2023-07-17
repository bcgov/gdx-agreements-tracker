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
const reportQueries = {
  fiscalYear: (PARAMETER) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", PARAMETER).first(),

  report: (PARAMETER) =>
    knex
      .select()
      .fromRaw(
        `
        (



        PASTE RAW QUERY HERE




        ) as base`
      )
      .where("fiscal", PARAMETER),

  totals: (PARAMETER) =>
    knex
      .select()
      .fromRaw(
        `
        (



        PASTE RAW QUERY HERE




        ) as base`
      )
      .where("fiscal", PARAMETER),
};

module.exports = {
  required: ["fiscal"], // e.g. fiscal, date, or portfolio
  getAll: async ({ fiscal: PARAMETER }) => {
    // replace fiscal  above with whatever parameter you take here
    const [{ fiscal_year } /*report, report_totals*/] = await Promise.all([
      reportQueries.fiscalYear(PARAMETER),
      /*
      reportQueries.report(PARAMETER),
      reportQueries.totals(PARAMETER),
      */
    ]);

    const reportData = { fiscal_year /*report, totals*/ };

    /**
     * console.warn doesn't produce a linter error
     * delete after your template is populating.
     */
    console.warn(JSON.stringify(reportData, null, 2));

    return reportData;
  },
};
