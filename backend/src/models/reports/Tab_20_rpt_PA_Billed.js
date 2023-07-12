const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { fiscalYearTable } = require("@models/useDbTables");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} fiscal - The fiscal year(s) to retrieve totals for.
 * @returns {Promise}                        - A promise that resolves to the query result
 *                                           containing the project name, breakdown for each quarter, and total recoveries to date
 *                                           for fiscal year input.
 */
const reportQueries = {
  fiscalYear: (fiscal) =>
    knex.select("fiscal_year").from(fiscalYearTable).where("fiscal_year.id", fiscal).first(),
  report: (fiscal) =>
    knex
      .with("base", (qb) => {
        qb.select({
          fy: "jv.fiscal_year_id",
          fiscal_year: "fiscal_year.fiscal_year",
          project_number: "P.project_number",
          project_name: "P.project_name",
          q1: knex.raw(`sum(CASE WHEN jv.quarter = '1' THEN jv.amount ELSE 0::money END)`),
          q2: knex.raw(`sum(CASE WHEN jv.quarter = '2' THEN jv.amount ELSE 0::money END)`),
          q3: knex.raw(`sum(CASE WHEN jv.quarter = '3' THEN jv.amount ELSE 0::money END)`),
          q4: knex.raw(`sum(CASE WHEN jv.quarter = '4' THEN jv.amount ELSE 0::money END)`),
          q_total: knex.raw(`sum(jv.amount)`),
        })
          .from("jv")
          .leftJoin("project AS P", "P.id", "jv.project_id")
          .leftJoin("fiscal_year", "fiscal_year.id", "jv.fiscal_year_id")
          .groupBy(
            "jv.fiscal_year_id",
            "fiscal_year.fiscal_year",
            "P.project_number",
            "P.project_name"
          )
          .orderBy("P.project_number", "asc")
          .orderBy("fiscal_year", "desc");
      })
      .select("fy", "project_number", "project_name", "q1", "q2", "q3", "q4", "q_total")
      .from("base")
      .where("fy", fiscal),

  report_totals: async () => [],
};

module.exports = {
  required: ["fiscal"],
  getAll: async (query) => {
    const { fiscal } = query;

    const [{ fiscal_year }, report, report_totals] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report(fiscal),
      reportQueries.report_totals(fiscal),
    ]);

    const reportData = {
      fiscal: fiscal_year,
      report,
      report_totals,
    };

    console.error(`
      IN GETALL model return:


     ${JSON.stringify(reportData, null, 2)}





     `);

    return reportData;
  },
};
