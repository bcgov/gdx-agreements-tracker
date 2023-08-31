// libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

// utilities
const { getReportWithSubtotals, whereInArray } = require("./helpers");

/**
 * Retrieves the data for the Portfolio Staff Recoveries Report.
 *
 * @param   {string | Array<string> } portfolio - The portfolio grab data for.
 * @param   {number}                  fiscal    - The fiscal year to grab data for.
 * @returns {object}                            - An object containing fiscal year, report, and report total.
 * @throws  {Error}                             - A generic error message with no details.
 */
const queries = {
  // The columns on which to calculate totals.
  columns: {
    q1: "report.q1",
    q2: "report.q2",
    q3: "report.q3",
    q4: "report.q4",
    total: "report.total",
  },

  // The query to get the report data.
  report: (portfolio, fiscal) =>
    knex
      .select({
        portfolio_name: "po.portfolio_name",
        project_number: "p.project_number",
        project_name: "p.project_name",
        fiscal_year: "fy.fiscal_year",
        portfolio_id: "p.portfolio_id",
        q1: knex.sum("pb.q1_amount"),
        q2: knex.sum("pb.q2_amount"),
        q3: knex.sum("pb.q3_amount"),
        q4: knex.sum("pb.q4_amount"),
        total: knex.raw("sum(pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount)"),
      })
      .from("project AS p")
      .joinRaw(
        `RIGHT JOIN (
          (
            fiscal_year fy
            RIGHT JOIN project_deliverable pd ON fy.id = pd.fiscal
          )
          RIGHT JOIN (
            portfolio po
            RIGHT JOIN project_budget pb ON po.id = pb.recovery_area
          ) ON pd.id = pb.project_deliverable_id
        ) ON p.id = pd.project_id`
      )
      .whereRaw(`left(pb.stob, 2) = '88'`)
      .groupBy(
        "po.id",
        "po.portfolio_name",
        "p.project_number",
        "p.project_name",
        "fy.fiscal_year",
        "fy.id",
        "pb.recovery_area",
        "pb.stob",
        "p.portfolio_id",
        "po.portfolio_abbrev"
      )
      .orderBy("portfolio_name", "asc")
      .orderBy("project_number", "asc")
      .orderBy("fiscal_year", "desc")
      .modify(whereInArray, "fy.id", fiscal)
      .modify(whereInArray, "po.id", portfolio),

  // The query to get the report totals.
  totals: (portfolio, fiscal) =>
    knex(queries.report(portfolio, fiscal).as("report"))
      .select({
        portfolio_name: "portfolio_name",
      })
      .sum(queries.columns)
      .groupBy("portfolio_name"),

  // The query to get the report grand totals.
  grandTotals: (portfolio, fiscal) =>
    knex(queries.report(portfolio, fiscal).as("report")).sum(queries.columns).first(),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object}                  options           - Options object containing fiscal year.
 * @param   {string | Array<string> } options.portfolio - The portfolio grab data for.
 * @param   {number}                  options.fiscal    - The fiscal year to grab data for.
 * @returns {object}                                    - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ portfolio, fiscal }) => {
  try {
    const reportData = await getReportData(portfolio, fiscal);
    const reportWithSubtotals = await getReportBySectionWithSubtotalsFrom(
      reportData,
      "portfolio_name"
    );

    return { report: reportWithSubtotals, grand_totals: reportData.grand_totals };
  } catch (error) {
    handleGetAllError(error);
  }
};

// Execute queries to get the report, totals, and grand totals
const getReportData = async (portfolio, fiscal) => {
  const [report, totals, grand_totals] = await Promise.all([
    queries.report(portfolio, fiscal),
    queries.totals(portfolio, fiscal),
    queries.grandTotals(portfolio, fiscal),
  ]);

  return { report, totals, grand_totals };
};

// Get report with subtotals folded into each section of the report
const getReportBySectionWithSubtotalsFrom = async (reportData, sectionName) => {
  const { report, totals } = reportData;
  const reportWithSubtotals = await getReportWithSubtotals(report, totals, sectionName);

  return reportWithSubtotals;
};

// Handle the error thrown by the getAll function.
const handleGetAllError = (error) => {
  log.error(error);
  throw new Error("Error retrieving data for Portfolio Staff Recoveries Report.");
};

// Exports
module.exports = { required: [], getAll };
