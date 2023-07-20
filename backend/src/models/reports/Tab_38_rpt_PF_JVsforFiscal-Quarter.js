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
  required: ["fiscal", "quarter"],
  getAll: async ({ fiscal, quarter }) => {
    // replace fiscal  above with whatever parameter you take here
    const [{ fiscal_year } /*report, report_totals*/] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
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
