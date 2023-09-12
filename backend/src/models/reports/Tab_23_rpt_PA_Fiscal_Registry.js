// Libs
const { knex } = require("@database/databaseConnection")();
const { keyBy, map } = require("lodash");

// Utilities
const { groupByProperty } = require("./helpers");

// Constant
const { dateFormatShortYear } = require("@helpers/standards");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  // The columns on which to calculate totals.
  columns: {
    total: "report.planned_budget",
  },

  // The query to get the fiscal year.
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal) =>
    knex
      .select({
        portfolio_name: "po.portfolio_name",
        project_number: "p.project_number",
        project_name: "p.project_name",
        project_manager: knex.raw(`(
          SELECT first_name || ' ' || last_name
          FROM contact
          WHERE id = p.project_manager
        )`),
        start_date: knex.raw(`to_char(p.planned_start_date, '${dateFormatShortYear}')`),
        end_date: knex.raw(`to_char(p.planned_end_date, '${dateFormatShortYear}')`),
        planned_budget: "p.planned_budget",
        ministry: "m.ministry_short_name",
        fiscal: "fy.id",
      })
      .from("fiscal_year as fy")
      .joinRaw(
        `INNER JOIN (
          (
            portfolio po
            RIGHT JOIN project p ON po.id = p.portfolio_id
          )
          INNER JOIN ministry m ON p.ministry_id = m.id
        ) on fy.id = p.fiscal`
      )
      .where("fiscal", fiscal)
      .groupBy(
        "po.portfolio_name",
        "p.project_number",
        "p.project_name",
        "p.project_manager",
        "p.planned_start_date",
        "p.planned_end_date",
        "p.planned_budget",
        "m.ministry_short_name",
        "fy.id"
      )
      .orderBy("po.portfolio_name", "asc")
      .orderBy("p.project_number", "asc"),

  // use report query to get totals from the column planned_budget, grouped by portfolio_name
  totals: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .select({
        portfolio_name: "portfolio_name",
      })
      .sum(queries.columns)
      .groupBy("portfolio_name"),

  // use report query to get grand totals from the column planned_budget
  grand_totals: (fiscal) => knex(queries.report(fiscal).as("report")).sum(queries.columns).first(),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {string} fiscal - The fiscal year to retrieve data for.
 * @returns {object}        - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ fiscal }) => {
  try {
    // get the report data from the database
    const { fiscal_year, report, totals, grand_totals } = await getReportData(fiscal);

    // organize the report data into groups with subtotals
    const reportWithSubtotals = organizeReportData(report, totals, "portfolio_name");

    // gather all the report data in a single object
    return { fiscal_year: fiscal_year, report: reportWithSubtotals, grand_totals: grand_totals };
  } catch (error) {
    handleError(error);
  }
};

// Organize the report data into groups with subtotals
const organizeReportData = (report, totals, propertyToGroupBy) => {
  // fold in subtotals for each group
  const reportWithSubtotals = addSubtotalsPerGroup(
    // Group the report data by the specified property
    groupByProperty(report, propertyToGroupBy),
    keyBy(totals, propertyToGroupBy)
  );

  return reportWithSubtotals;
};

// Fold in subtotals for each group
const addSubtotalsPerGroup = (reportGroupedByPortfolio, totalsGroupedByPortfolio) => {
  const reportWithSubtotals = map(reportGroupedByPortfolio, (portfolio) => ({
    ...portfolio,
    portfolio_totals: totalsGroupedByPortfolio[portfolio.portfolio_name],
  }));

  return reportWithSubtotals;
};

// Execute queries to get the report, totals, and grand totals
const getReportData = async (fiscal) => {
  const [{ fiscal_year }, report, totals, grand_totals] = await Promise.all([
    queries.fiscal(fiscal),
    queries.report(fiscal),
    queries.totals(fiscal),
    queries.grand_totals(fiscal),
  ]);

  return {
    fiscal_year,
    report,
    totals,
    grand_totals,
  };
};

// handle report data retrieval errors
const handleError = (error) => {
  throw new Error(
    `Error retrieving data for the Project Registry by Fiscal report. ${error.message}`
  );
};

// export the report model
module.exports = { required: ["fiscal"], getAll };
