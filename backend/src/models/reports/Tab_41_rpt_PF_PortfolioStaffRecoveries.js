// libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const _ = require("lodash");

// utilities
const { getReportWithSubtotals, whereInArray } = require("./helpers");

/**
 * Retrieves the data for various financial metrics based on the portfolio IDs past from the front end.
 * Retrieves the data for various financial metrics based on the portfolio IDs past from the front end.
 *
 * @param   {Array<number>} portfolios - The Portfolio to grab data for
 * @returns {Promise}                  - A promise that resolves to the query result
 * @param   {Array<number>} portfolios - The Portfolio to grab data for
 * @returns {Promise}                  - A promise that resolves to the query result
 */
const queries = {
  report: (portfolio) =>
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
      .modify(whereInArray, "po.id", portfolio),

  totals: (portfolio) =>
    knex(queries.report(portfolio).as("report"))
      .select({
        portfolio_name: "portfolio_name",
      })
      .sum({
        q1: "report.q1",
        q2: "report.q2",
        q3: "report.q3",
        q4: "report.q4",
        total: "report.total",
      })
      .groupBy("portfolio_name"),

  grandTotals: (portfolio) =>
    knex(queries.report(portfolio).as("report"))
      .sum({
        q1: "report.q1",
        q2: "report.q2",
        q3: "report.q3",
        q4: "report.q4",
        total: "report.total",
      })
      .first(),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object}                  options           - Options object containing fiscal year.
 * @param   {string | Array<string> } options.portfolio - The portfolio grab data for.
 * @returns {object}                                    - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ portfolio }) => {
  // todo: use lodash chain here
  // Await all promises in parallel
  const [report, totals, grand_totals] = await Promise.all(
    _.map(queries, (query) => query(portfolio).catch((err) => log.error(err)))
  );

  return {
    // Group the report by portfolio, and add subtotals for each portfolio
    report: await getReportWithSubtotals(report, totals, "portfolio_name"),
    grand_totals,
  };
};

// Exports
module.exports = { required: [], getAll };
