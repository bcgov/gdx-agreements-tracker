const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { groupByProperty } = require("../../controllers/reports/helpers");
const _ = require("lodash");

/**
 * Retrieves the Project Forecasting by Quarter, filtered by portfolio
 *
 * @param   {number | string | Array} portfolio- The portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */

//const portfolio = [portfolio];

const reportQueries = {
  // The columns on which to calculate totals.
  columns: {
    sum_of_q1_amount: "sum_of_q1_amount",
    sum_of_q2_amount: "sum_of_q2_amount",
    sum_of_q3_amount: "sum_of_q3_amount",
    sum_of_q4_amount: "sum_of_q4_amount",
    total: "total",
  },

  // The report query, which builds off of base queries.
  report: (portfolio) =>
    knex
      .with(
        "q1",
        knex.raw(
          `SELECT
            po.id AS portfolio_id, 
            po.portfolio_name, 
            p.project_number, 
            p.project_name, 
            pb.q1_amount, 
            pb.q2_amount, 
            pb.q3_amount, 
            pb.q4_amount, 
            po.portfolio_abbrev, 
            fy.fiscal_year 
          FROM 
            project_budget pb 
          LEFT JOIN project_deliverable pd ON pb.project_deliverable_id = pd.id 
          LEFT JOIN project p ON pd.project_id = p.id 
          LEFT JOIN fiscal_year fy ON pd.fiscal = fy.id 
          LEFT JOIN portfolio po ON pb.recovery_area = po.id`
        )
      )
      .select({
        portfolio_id: "q1.portfolio_id",
        portfolio_name: "q1.portfolio_name",
        project_number: "q1.project_number",
        project_name: "q1.project_name",
      })
      .sum({
        sum_of_q1_amount: "q1.q1_amount",
        sum_of_q2_amount: "q1.q2_amount",
        sum_of_q3_amount: "q1.q3_amount",
        sum_of_q4_amount: "q1.q4_amount",
        total: knex.raw("q1.q1_amount + q1.q2_amount + q1.q3_amount + q1.q4_amount"),
      })
      .from("q1")
      .groupBy(
        "q1.portfolio_id",
        "q1.portfolio_name",
        "q1.project_number",
        "q1.project_name",
        "q1.fiscal_year",
        "q1.portfolio_abbrev"
      )
      .havingRaw(
        `(
          q1.fiscal_year LIKE '%' || '20' || '%'
        ) 
        AND (
          q1.portfolio_abbrev = CASE WHEN 'All' = 'All' THEN portfolio_abbrev ELSE 'All' END
        )`
      )
      .whereIn("q1.portfolio_id", portfolio instanceof Array ? portfolio : [portfolio])
      .orderBy("portfolio_name", "project_number"),

  // Subtotals for each portfolio.
  totals: (portfolio) =>
    knex(reportQueries.report(portfolio).as("report"))
      .select({
        portfolio_name: "portfolio_name",
      })
      .sum(reportQueries.columns)
      .groupBy("portfolio_name"),

  // Grand totals for the report columns.
  grandTotals: (portfolio) =>
    knex(reportQueries.report(portfolio).as("report")).sum(reportQueries.columns),
};

module.exports = {
  required: ["portfolio"],
  getAll: async ({ portfolio }) => {
    const [report, totals, grand_totals] = await Promise.all([
      reportQueries.report(portfolio),
      reportQueries.totals(portfolio),
      reportQueries.grandTotals(portfolio),
    ]);

    // Restructure data to allow for grouping by portfolios
    const reportByPortfolio = groupByProperty(report, "portfolio_name");
    const totalsByPortfolio = _.keyBy(totals, "portfolio_name");
    const reportsByPortfolioWithTotals = _.map(reportByPortfolio, (portfolio) => ({
      ...portfolio,
      portfolio_totals: totalsByPortfolio[portfolio.portfolio_name],
    }));

    return { reportsByPortfolioWithTotals, grand_totals };
  },
};
