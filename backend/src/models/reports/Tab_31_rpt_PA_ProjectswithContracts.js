// libs
const { knex } = require("@database/databaseConnection")();
const _ = require("lodash");
// utils
const { groupByProperty } = require("../../controllers/reports/helpers");

/**
 * Retrieves the base queries for invoice payments without filtering by fiscal year.
 *
 * @returns {Promise} - A promise that resolves to the query result
 */
const baseQueries = {
  q1: knex.raw(
    `(
      SELECT DISTINCT p.id AS project_id,
        p.fiscal,
        p.project_number,
        p.project_version,
        p.project_name,
        p.total_project_budget,
        p.recoverable_amount
      FROM contract c
        INNER JOIN project p ON c.project_id = p.id
      WHERE p.project_status like 'Complete'
        OR p.project_status = 'Active')`
  ),

  q2: knex.raw(
    `(
    SELECT p.id project_id,
      c.co_number,
      c.co_version,
      s.supplier_name,
      sc.subcontractor_name,
      coalesce(fy.fiscal_year, fy_d.fiscal_year) fiscal_year,
      coalesce(
        t.total_fee_amount,
        c.total_fee_amount
      ) + coalesce(
        t.total_expense_amount,
        c.total_expense_amount
      ) total_contract_amount,
      sum(id.unit_amount * id.rate) invoiced_to_date,
      coalesce(
        t.total_fee_amount,
        c.total_fee_amount
      ) + coalesce(
        t.total_expense_amount,
        c.total_expense_amount
      ) - sum(id.unit_amount * id.rate) balance_remaining,
      to_char(c.end_date, 'DD-Mon-YY') end_date,
      p.id,
      c.status
    FROM project p
      LEFT JOIN contract c ON p.id = c.project_id
      LEFT JOIN contract_subcontractor cs ON cs.contract_id = c.id
      LEFT JOIN subcontractor sc ON cs.subcontractor_id = sc.id
      LEFT JOIN fiscal_year fy_d ON c.fiscal = fy_d.id
      LEFT JOIN supplier s ON c.supplier_id = s.id
      LEFT JOIN (
        SELECT contract_id,
          fiscal,
          sum(total_fee_amount) total_fee_amount,
          sum(total_expense_amount) total_expense_amount
        FROM (
            SELECT contract_id,
              fiscal,
              sum(hours * assignment_rate) total_fee_amount,
              NULL total_expense_amount
            FROM contract_resource
            GROUP BY contract_id,
              fiscal
            UNION
            SELECT contract_id,
              fiscal,
              sum(
                CASE
                  WHEN is_expense = 0::boolean THEN deliverable_amount
                  ELSE 0::MONEY
                END
              ),
              sum(
                CASE
                  WHEN is_expense = 1::boolean THEN deliverable_amount
                  ELSE 0::MONEY
                END
              )
            FROM contract_deliverable
            GROUP BY contract_id,
              fiscal
          ) t_sub
        GROUP BY contract_id,
          fiscal
      ) t ON c.id = t.contract_id
      LEFT JOIN fiscal_year fy ON t.fiscal = fy.id
      LEFT JOIN invoice i ON t.contract_id = i.contract_id
      AND t.fiscal = i.fiscal
      LEFT JOIN invoice_detail id ON i.id = id.invoice_id
    GROUP BY p.id,
      c.co_number,
      c.co_version,
      s.supplier_name,
      sc.subcontractor_name,
      coalesce(
        fy.fiscal_year,
        fy_d.fiscal_year
      ),
      coalesce(
        t.total_fee_amount,
        c.total_fee_amount
      ) + coalesce(
        t.total_expense_amount,
        c.total_expense_amount
      ),
      c.end_date,
      p.id,
      c.status)`
  ),
};

// Query model - this object organizes the promises that resolve to each part of the query results for the report
const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  main: knex.raw(
    `(
      SELECT n1.project_number,
        n1.project_name,
        n1.total_project_budget,
        n2.fiscal_year,
        n2.co_number,
        n2.co_version,
        (
          n2.supplier_name || CASE
            WHEN length(n2.subcontractor_name || '') > 0 THEN '/' || n2.subcontractor_name
            ELSE ''
          END
        ) supplier_subcontractor,
        n2.end_date,
        n2.total_contract_amount,
        n2.invoiced_to_date,
        (
          CASE
            WHEN n2.status IN (
              'Complete',
              'Cancelled'
            ) THEN cast(0 AS MONEY)
            ELSE (
              CASE
                WHEN n2.balance_remaining IS NOT NULL THEN n2.balance_remaining
                ELSE n2.total_contract_amount
              END
            )
          END
        ) balance_remaining,
        (
          CASE
            WHEN status IN (
              'Complete',
              'Cancelled'
            ) THEN (
              CASE
                WHEN balance_remaining IS NOT NULL THEN balance_remaining
                ELSE total_contract_amount
              END
            )
            ELSE cast(0 AS MONEY)
          END
        ) AS descoped,
        fiscal
      FROM ${baseQueries.q1} AS n1
        INNER JOIN ${baseQueries.q2} AS n2
      ON n1.project_id = n2.project_id) AS base`
  ),

  // get the report data for the given fiscal year
  report: (fiscal) =>
    knex
      .from(queries.main)
      .groupBy(
        "project_number",
        "project_name",
        "total_project_budget",
        "fiscal_year",
        "co_number",
        "co_version",
        "supplier_subcontractor",
        "end_date",
        "total_contract_amount",
        "invoiced_to_date",
        "balance_remaining",
        "descoped",
        "fiscal"
      )
      .orderByRaw(`project_number, fiscal_year, co_number`)
      .where({ fiscal }),

  // fold this into the report data at every project number
  subtotals: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .select({
        project_number: "project_number",
        project_name: "project_name",
      })
      .sum({
        subtotal_total_contract_amount: "total_contract_amount",
        subtotal_invoiced_to_date: "invoiced_to_date",
        subtotal_balance_remaining: "balance_remaining",
        subtotal_descoped: "descoped",
      })
      .groupBy("project_number", "project_name"),

  // fold this in to the very end of the results
  totals: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .sum({
        total_contract_amount: "total_contract_amount",
        invoiced_to_date: "invoiced_to_date",
        balance_remaining: "balance_remaining",
        descoped: "descoped",
      })
      .first(),
};

/**********************************************************************************
 * Represents a report.
 *
 * @class
 * @param {Array} required - The required parameters for the report.
 */
class Report {
  constructor(...required) {
    const [fiscal] = required;
    this.required = fiscal;
  }

  /**
   * Gets all reports for the required parameters specified in the constructor.
   *
   * @async
   * @returns {Promise<object>} An object containing the fiscal year and report data.
   */
  async getAll() {
    try {
      const { required, getReportWithSubtotals } = this;
      const { fiscal_year } = await queries.fiscal(required);
      const report = await queries.report(required);
      const reportMayIncludeSubtotals = queries?.subtotals
        ? await getReportWithSubtotals(report, required)
        : report;
      const totals = queries?.totals ? await queries.totals(required) : null;

      return {
        fiscal_year,
        report: reportMayIncludeSubtotals,
        totals,
      };
    } catch (error) {
      console.error(`
        **** MODEL ERROR ****
        ${error}
      `);

      throw error;
    }
  }

  /**
   * Gets a report with subtotals.
   *
   * @async
   * @param   {Array}          report   - The report data.
   * @param   {any}            required - The required parameters for the subtotals query.
   * @returns {Promise<Array>}          An array of report Promise objects with subtotals added.
   */
  async getReportWithSubtotals(report, required) {
    // Get the subtotals data from the database
    const subtotals = await queries.subtotals(required);

    // Group the report data by project number
    const reportsByProjectNumber = groupByProperty(report, "project_number");

    // Create an object with the subtotals data keyed by project number
    const subtotalsByProjectNumber = _.keyBy(subtotals, "project_number");

    // Add the subtotals data to the report data
    const reportsByProjectNumberWithSubtotals = reportsByProjectNumber.map((report) => {
      return {
        project_name: _.get(report.projects, "0").project_name,
        ...report,
        subtotals: subtotalsByProjectNumber[report.project_number],
      };
    });

    // Return the report data with subtotals added
    return reportsByProjectNumberWithSubtotals;
  }
}

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => await new Report(fiscal).getAll(),
};
