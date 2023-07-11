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
      .select(`*`)
      .fromRaw(
        `
    (WITH base AS (
      SELECT jv.fiscal_year_id AS fy,
        fiscal_year.fiscal_year,
        P.project_number,
        P.project_name,
        sum(CASE WHEN jv.quarter = '1' THEN jv.amount ELSE 0::money END) AS "q1",
        sum(CASE WHEN jv.quarter = '2' THEN jv.amount ELSE 0::money END) AS "q2",
        sum(CASE WHEN jv.quarter = '3' THEN jv.amount ELSE 0::money END) AS "q3",
        sum(CASE WHEN jv.quarter = '4' THEN jv.amount ELSE 0::money END) AS "q4",
        sum(jv.amount) AS "qTotal"
      FROM fiscal_year
        INNER JOIN (
          project P
          RIGHT JOIN jv ON P.id = jv.project_id
        ) ON fiscal_year.id = jv.fiscal_year_id
      GROUP BY jv.fiscal_year_id,
        fiscal_year.fiscal_year,
        P.project_number,
        P.project_name
      ORDER BY P.project_number ASC,
        fiscal_year DESC
    )
    SELECT fy,
      project_number,
      project_name,
      q1,
      q2,
      q3,
      q4,
      "qTotal",
      sum(base.qTotal)
    FROM base) AS query`
      )
      .where("query.fy", fiscal),
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
