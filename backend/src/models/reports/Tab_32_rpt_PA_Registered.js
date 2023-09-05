// libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const _ = require("lodash");

// utilities
const { formatDate, groupByProperty } = require("./helpers");

/**
 * Retrieves the data for the Projects Registered Report.
 *
 * @param   {string} date - The date to grab data for.
 * @returns {object}      - An object containing the report, report totals, and the date.
 * @throws  {Error}       - A generic error message with no details.
 */
const queries = {
  // The columns on which to calculate totals.
  columns: {
    total: "report.planned_budget",
  },

  // The query to get the report data.
  report: (date) => {
    const query = knex
      .select({
        portfolio_name: "po.portfolio_name",
        "#": "p.project_number",
        name: "p.project_name",
        project_manager: knex.raw(`(
        SELECT first_name || ' ' || last_name
        FROM contact
        WHERE id = p.project_manager
      )`),
        description: "p.description",
        initiation_date: knex.raw("to_char(p.initiation_date, 'dd-Mon-yy')"),
        start_date: knex.raw("to_char(p.planned_start_date, 'dd-Mon-yy')"),
        end_date: knex.raw("to_char(p.planned_end_date, 'dd-Mon-yy')"),
        planned_budget: "p.planned_budget",
        ministry: "m.ministry_short_name",
      })
      .from("portfolio AS po")
      .rightJoin("project AS p", "po.id", "p.portfolio_id")
      .innerJoin("ministry AS m", "p.ministry_id", "m.id")
      .groupBy(
        "po.portfolio_name",
        "p.project_number",
        "p.project_name",
        "p.project_manager",
        "p.description",
        "p.initiation_date",
        "p.planned_start_date",
        "p.planned_end_date",
        "p.planned_budget",
        "m.ministry_short_name"
      )
      .orderBy("po.portfolio_name")
      .orderBy("p.project_number");
    //The frontend enforces that you enter a date, this is a second layer of validation.  This is a unique knex query where knex will check if the initiation date is greater than or equal to the param date passed in.
    if (date) {
      query.where("p.initiation_date", ">=", date);
    }

    return query;
  },

  // use report query to get totals from the column planned_budget, grouped by portfolio_name
  totals: (date) =>
    knex(queries.report(date).as("report"))
      .select({
        portfolio_name: "portfolio_name",
      })
      .sum(queries.columns)
      .groupBy("portfolio_name"),

  // use report query to get grand totals from the column planned_budget
  grandTotals: (date) => knex(queries.report(date).as("report")).sum(queries.columns).first(),
};

/**
 *
 * Get all the report data for the Projects Registered Report.
 *
 * @param   {string} date - The date to grab data for.
 * @returns {object}      - An object containing the report, report totals, and the date.
 */
const getAll = async ({ date }) => {
  try {
    // get the report data from the database
    const { report, totals, grand_totals, afterDate } = await getReportData(date);

    // organize the report data into groups with subtotals
    const reportWithSubtotals = organizeReportData(report, totals, "portfolio_name");

    // gather all the report data in a single object
    return { report: reportWithSubtotals, grand_totals: grand_totals, afterDate };
  } catch (error) {
    handleError(error);
  }
};

// Organize the report data into groups with subtotals
const organizeReportData = (report, totals, propertyToGroupBy) => {
  // Group the report data by the specified property
  const reportGroupedByPortfolio = groupByProperty(report, propertyToGroupBy);
  const totalsGroupedByPortfolio = _.keyBy(totals, propertyToGroupBy);

  // fold in subtotals for each group
  const reportWithSubtotals = _.map(reportGroupedByPortfolio, (portfolio) => ({
    ...portfolio,
    portfolio_totals: totalsGroupedByPortfolio[portfolio.portfolio_name],
  }));

  return reportWithSubtotals;
};

// Execute queries to get the report, totals, and grand totals
const getReportData = async (date) => {
  return {
    report: await queries.report(date),
    totals: await queries.totals(date),
    grand_totals: await queries.grandTotals(date),
    afterDate: formatDate(date),
  };
};

// handle report data retrieval errors
const handleError = (error) => {
  log.error(error);
  throw new Error("Error retrieving data for the Projects registered report.");
};

module.exports = { required: ["date"], getAll };
