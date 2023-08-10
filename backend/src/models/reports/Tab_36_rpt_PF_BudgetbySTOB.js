const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves the final queries for invoice payments, filtered by fiscal year
 *
 * @param   {number | string | Array} fiscal- The fiscal year to grab data for
 * @returns {Promise}                         - A promise that resolves to the query result
 */
const reportQueries = {
  fiscalYear: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // The columns on which to calculate totals.
  columns: {
    total_project_budget: "total_project_budget",
    cy_nonrecoverable_amount: "cy_nonrecoverable_amount",
    cy_total_recoverable: "cy_total_recoverable",
    cy_recovered_to_date: "cy_recovered_to_date",
    6398: "6398",
    8807: "8807",
    8809: "8809",
    5798: "5798",
    6598: "6598",
    other: "other",
  },

  // The report query, which builds off of base queries.
  report: (fiscal) =>
    knex
      .with(
        "q1",
        knex.raw(
          `SELECT
            p.id project_id,
            p.project_number,
            p.project_name,
            p.recoverable,
            po.id portfolio_id,
            po.portfolio_name,
            po.portfolio_abbrev,
            p.total_project_budget,
            p.recoverable_amount,
            pb.stob,
            pb.q1_recovered,
            pb.q1_amount,
            pb.q2_recovered,
            pb.q2_amount,
            pb.q3_recovered,
            pb.q3_amount,
            pb.q4_recovered,
            pb.q4_amount,
            fy.fiscal_year,
            pd.fiscal
          FROM
            project_budget pb
          LEFT JOIN Project_Deliverable pd ON pb.Project_Deliverable_Id = pd.ID 
            LEFT JOIN Project p ON pd.Project_ID = p.ID 
            LEFT JOIN Fiscal_Year fy ON pd.Fiscal = fy.ID 
            LEFT JOIN Portfolio po ON pb.Recovery_Area = po.ID`
        )
      )
      .with(
        "q2",
        knex.raw(
          `SELECT 
            q1.project_id, 
            q1.project_number, 
            q1.project_name, 
            q1.recoverable, 
            q1.portfolio_id, 
            q1.portfolio_name, 
            q1.portfolio_abbrev, 
            q1.total_project_budget, 
            q1.recoverable_amount, 
            q1.stob,
            SUM(q1_amount + q2_amount + q3_amount + q4_amount) AS current_fy_total_recoverable, 
            SUM(
              CASE WHEN q1_recovered THEN q1_amount ELSE CAST(0 AS MONEY) END + 
              CASE WHEN q2_recovered THEN q2_amount ELSE CAST(0 AS MONEY) END + 
              CASE WHEN q3_recovered THEN q3_amount ELSE CAST(0 AS MONEY) END + 
              CASE WHEN q4_recovered THEN q4_amount ELSE CAST(0 AS MONEY) END
            ) AS current_fy_recovered_to_date, 
            q1.fiscal_year
          FROM 
            q1 
          GROUP BY 
            q1.project_id, 
            q1.project_number, 
            q1.project_name, 
            q1.recoverable, 
            q1.portfolio_id, 
            q1.portfolio_name, 
            q1.portfolio_abbrev, 
            q1.total_project_budget, 
            q1.recoverable_amount, 
            q1.stob, 
            q1.fiscal_year,
            q1.fiscal
          HAVING 
            q1.fiscal = ?`,
          fiscal
        )
      )
      .with(
        "q3",
        knex.raw(
          `SELECT 
            pd.project_id,
            SUM(pd.deliverable_amount) AS sum_of_deliverable_amount, 
            SUM(pd.recoverable_amount) AS sum_of_recoverable_amount, 
            first_value(pd.project_id) OVER(PARTITION BY pd.project_id) AS first_of_project_id, 
            fy.fiscal_year
          FROM 
            project_deliverable pd 
          LEFT JOIN fiscal_year fy ON pd.fiscal = fy.id 
          GROUP BY 
            pd.project_id, 
            fy.fiscal_year`
        )
      )
      .select({
        project_number: "q2.project_number",
        project_name: "q2.project_name",
        recoverable: "q2.recoverable",
        total_project_budget: "q2.total_project_budget",
        cy_nonrecoverable_amount: knex.raw("sum_of_deliverable_amount - sum_of_recoverable_amount"),
      })
      .sum({
        cy_total_recoverable: "q2.current_fy_total_recoverable",
        cy_recovered_to_date: "q2.current_fy_recovered_to_date",
        6398: knex.raw(
          `CASE WHEN q2.stob = '6398' THEN q2.current_fy_total_recoverable ELSE NULL END`
        ),
        8807: knex.raw(
          `CASE WHEN q2.stob = '8807' THEN q2.current_fy_total_recoverable ELSE NULL END`
        ),
        8809: knex.raw(
          `CASE WHEN q2.stob = '8809' THEN q2.current_fy_total_recoverable ELSE NULL END`
        ),
        5798: knex.raw(
          `CASE WHEN q2.stob = '5798' THEN q2.current_fy_total_recoverable ELSE NULL END`
        ),
        6598: knex.raw(
          `CASE WHEN q2.stob = '6598' THEN q2.current_fy_total_recoverable ELSE NULL END`
        ),
        other: knex.raw(
          `CASE WHEN q2.stob NOT IN ('6598', '8807', '8809', '5798', '6598') THEN current_fy_total_recoverable ELSE NULL END`
        ),
      })
      .from("q3")
      .rightJoin("q2", function () {
        this.on("q3.fiscal_year", "q2.fiscal_year").andOn("q3.project_id", "q2.project_id");
      })
      .groupByRaw(
        `q2.project_id,
        q2.project_number,
        q2.project_name,
        q2.recoverable,
        q2.total_project_budget,
        q3.sum_of_deliverable_amount,
        sum_of_deliverable_amount - sum_of_recoverable_amount`
      )
      .orderBy("project_number"),

  // Grand totals for the report columns.
  grandTotals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report")).sum(reportQueries.columns),
};

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    const [{ fiscal_year }, report, grandTotals] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report(fiscal),
      reportQueries.grandTotals(fiscal),
    ]);

    return { fiscal_year, report, grandTotals };
  },
};
