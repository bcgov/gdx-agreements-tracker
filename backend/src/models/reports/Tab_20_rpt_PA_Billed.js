// libs
const { knex } = require("@database/databaseConnection")();

/**
 * Retrieves report totals based on fiscal year.
 *
 * This can be reused many times! (it is used for the report and report totals here.)
 *
 * @param   {string}            fiscal - Fiscal year value to filter the report.
 * @returns {Knex.QueryBuilder}        Knex query builder for fetching report totals.
 */
const baseQuery = knex("jv")
  .select({
    fy: "fiscal_year_id",
    fiscal_year: "fiscal_year.fiscal_year",
    project_number: "P.project_number",
    project_name: "P.project_name",
    q1: knex.raw("COALESCE(SUM(amount) FILTER (WHERE quarter = '1'), 0::money)"),
    q2: knex.raw("COALESCE(SUM(amount) FILTER (WHERE quarter = '2'), 0::money)"),
    q3: knex.raw("COALESCE(SUM(amount) FILTER (WHERE quarter = '3'), 0::money)"),
    q4: knex.raw("COALESCE(SUM(amount) FILTER (WHERE quarter = '4'), 0::money)"),
    q_total: knex.raw("COALESCE(SUM(amount), 0::money)"),
  })
  .leftJoin("project AS P", "P.id", "jv.project_id")
  .leftJoin("fiscal_year", "fiscal_year.id", "jv.fiscal_year_id")
  .groupBy("fiscal_year_id", "fiscal_year.fiscal_year", "P.project_number", "P.project_name")
  .orderBy("P.project_number", "asc")
  .orderBy("fiscal_year", "desc");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} fiscal - The fiscal year(s) to retrieve totals for.
 * @returns {Promise}                        - A promise that resolves to the query result
 *                                           containing the project name, breakdown for each quarter,
 *                                           and total recoveries to date for fiscal year input.
 */
const reportQueries = {
  fiscalYear: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal) =>
    knex
      .select("fy", "project_number", "project_name", "q1", "q2", "q3", "q4", "q_total")
      .from(baseQuery.as("base"))
      .where("fy", fiscal),

  report_totals: (fiscal) =>
    knex
      .from(baseQuery.as("base"))
      .sum("q1 as q1_total")
      .sum("q2 as q2_total")
      .sum("q3 as q3_total")
      .sum("q4 as q4_total")
      .sum("q_total as grand_total")
      .where("fy", fiscal),
};

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    const [{ fiscal_year }, report, report_totals] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report(fiscal),
      reportQueries.report_totals(fiscal),
    ]);

    console.error(`
      IN GETALL model return:
     ${JSON.stringify({ fiscal_year, report, report_totals }, null, 2)}
     `);

    return { fiscal_year, report, report_totals };
  },
};
