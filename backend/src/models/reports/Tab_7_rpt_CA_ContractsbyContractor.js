// Libs
const { knex } = require("@database/databaseConnection")();
const { keyBy, map } = require("lodash");

// Helpers
const { groupByProperty, dateFormatShortYear } = require("./helpers");

/**
 * Queries to retrieve data from the database.
 *
 * @param   {number}  contractor - The contractor id to retrieve data for.
 * @returns {Promise}            - A promise that resolves to the query result
 */
const queries = {
  // The columns on which to calculate totals.
  columns: {
    total: "report.total_contract_amt",
  },

  // The query to get contractor data.
  report: (contractor) =>
    knex
      .with(
        "q1",
        knex.raw(`
          SELECT fy.fiscal_year,
            r.resource_first_name,
            r.resource_last_name,
            r.id AS contractor,
            p.project_number,
            c.co_number,
            c.co_version,
            c.description,
            c.start_date,
            c.end_date,
            c.status,
            c.total_fee_amount + c.total_expense_amount AS total_contract_amt
          FROM project p
            INNER JOIN (
              (
                RESOURCE r
                INNER JOIN (
                  contract c
                  INNER JOIN contract_resource cr ON c.id = cr.contract_id
                ) ON r.id = cr.resource_id
              )
              INNER JOIN fiscal_year fy ON c.fiscal = fy.id
            ) ON p.id = c.project_id
          ORDER BY r.resource_last_name,
            c.end_date DESC`)
      )
      .with(
        "q2",
        knex.raw(`
          SELECT q1.fiscal_year,
            q1.resource_first_name,
            q1.resource_last_name,
            q1.contractor,
            q1.project_number,
            q1.co_number,
            q1.co_version,
            q1.description,
            q1.start_date,
            q1.end_date,
            q1.status,
            q1.total_contract_amt
          FROM q1
          UNION
          SELECT fy.fiscal_year,
            r.resource_first_name,
            r.resource_last_name,
            r.id AS contractor,
            hc.project_number,
            hc.co_number,
            CASE
              WHEN hc.amendment_count <> 0 THEN 'A' || hc.amendment_count
              ELSE ''
            END,
            'Historical Contract' AS expr1,
            hc.start_date,
            hc.end_date,
            'Complete' AS status,
            hc.total_contract_amount
          FROM RESOURCE r
            INNER JOIN (
              fiscal_year fy
              INNER JOIN (
                historical_contracts hc
                INNER JOIN historical_contract_assignments hca ON hc.co_number = hca.co_number
              ) ON fy.id = hc.fiscal_year
            ) ON r.id = hca.resource_id`)
      )
      .select({
        fiscal_year: "fiscal_year",
        resource_first_name: "resource_first_name",
        resource_last_name: "resource_last_name",
        contractor: "contractor",
        co_number: "co_number",
        co_version: "co_version",
        project_number: "project_number",
        description: "description",
        start_date: knex.raw(`to_char(start_date, '${dateFormatShortYear}')`),
        end_date: knex.raw(`to_char(end_date, '${dateFormatShortYear}')`),
        total_contract_amt: "total_contract_amt",
        status: "status",
      })
      .from("q2")
      .where({ contractor: contractor })
      .groupBy(
        "fiscal_year",
        "resource_first_name",
        "resource_last_name",
        "contractor",
        "co_number",
        "co_version",
        "project_number",
        "description",
        "start_date",
        "end_date",
        "total_contract_amt",
        "status"
      )
      .orderBy("fiscal_year", "asc"),

  // use report query to get totals from the column planned_budget, grouped by portfolio_name
  totals: (contractor) =>
    knex(queries.report(contractor).as("report"))
      .select({
        fiscal_year: "fiscal_year",
        resource_first_name: "resource_first_name",
        resource_last_name: "resource_last_name",
        contractor: "contractor",
      })
      .sum(queries.columns)
      .groupBy("fiscal_year", "resource_first_name", "resource_last_name", "contractor")
      .orderBy("fiscal_year", "asc"),

  // use report query to get grand totals from the column planned_budget
  grand_totals: (contractor) =>
    knex(queries.report(contractor).as("report")).sum(queries.columns).first(),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {number} contractor - The contractor id to retrieve data for.
 * @returns {object}            - An object containing report (organized by fiscal year), subtotals per section, and grand total..
 */
const getAll = async ({ resource: contractor }) => {
  try {
    // get the report data
    const { report, totals, grand_totals } = await getReportData(contractor);

    // add subtotals to the report data
    const reportWithSubtotals = organizeReportData(report, totals, "fiscal_year");

    // gather all the report data in a single object
    return {
      report: reportWithSubtotals,
      grand_totals: grand_totals,
    };
  } catch (error) {
    handleError(error);
  }
};

// Organize the report data into groups with subtotals
const organizeReportData = (report, totals, propertyToGroupBy) =>
  addSubtotalsPerGroup({
    reportGroupedByProperty: groupByProperty(report, propertyToGroupBy),
    totalsGroupedByProperty: keyBy(totals, propertyToGroupBy),
  });

// Fold in subtotals for each group
const addSubtotalsPerGroup = ({ reportGroupedByProperty, totalsGroupedByProperty }) =>
  map(reportGroupedByProperty, (contractor) => ({
    ...contractor,
    fiscal_totals: totalsGroupedByProperty[contractor.fiscal_year],
  }));

// Execute queries to get the report, totals, and grand totals
const getReportData = async (contractor) => ({
  report: await queries.report(contractor),
  totals: await queries.totals(contractor),
  grand_totals: await queries.grand_totals(contractor),
});

// throw an error to the controller if the report data could not be retrieved
const handleError = (error) => {
  throw new Error(
    `Error retrieving data for the Project Registry by Fiscal report. ${error.message}`
  );
};

// export the report model
module.exports = { required: ["resource"], getAll };
