// libs
const { knex } = require("@database/databaseConnection")();

const baseQueries = {
  q1: knex.raw(
    `(
      SELECT c.project_id,
        c.fiscal,
        sum(c.total_fee_amount) AS fees,
        sum(c.total_expense_amount) AS expenses,
        sum(total_fee_amount + total_expense_amount) AS total_contract
      FROM contract c
      GROUP BY c.project_id,
        c.fiscal
      HAVING c.project_id IS NOT NULL)`
  ),

  q2: knex.raw(
    `(
      SELECT p.project_number,
        p.project_name,
        p.total_project_budget,
        q1.total_contract,
        p.recoverable_amount,
        sum(q1_amount + q2_amount + q3_amount + q4_amount) AS current_fy_total_recoverable,
        sum(
          CASE WHEN q1_recovered THEN q1_amount ELSE cast(0 AS MONEY) END +
          CASE WHEN q2_recovered THEN q2_amount ELSE cast(0 AS MONEY) END +
          CASE WHEN q3_recovered THEN q3_amount ELSE cast(0 AS MONEY) END +
          CASE WHEN q4_recovered THEN q4_amount ELSE cast(0 AS MONEY) END
        ) AS current_fy_recovered_to_date,
        fy.id as fiscal_year
      FROM project p
        RIGHT JOIN (
          (
            (
              fiscal_year fy
              RIGHT JOIN project_deliverable pd ON fy.id = pd.fiscal
            )
            LEFT JOIN q1 ON (pd.fiscal = q1.fiscal)
            AND (pd.project_id = q1.project_id)
          )
          RIGHT JOIN (
            portfolio po
            RIGHT JOIN project_budget pb ON po.id = pb.recovery_area
          ) ON pd.id = pb.project_deliverable_id
        ) ON p.id = pd.project_id
      GROUP BY p.id,
        p.project_number,
        p.project_name,
        po.portfolio_name,
        po.portfolio_abbrev,
        p.total_project_budget,
        p.recoverable_amount,
        q1.fees,
        q1.expenses,
        q1.total_contract,
        pd.fiscal,
        fy.fiscal_year,
        fy.id
      )`
  ),
};

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const reportQueries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  main: knex.raw(
    `
    (
      WITH
      q1 AS ${baseQueries.q1},
      q2 AS ${baseQueries.q2}
      SELECT project_number,
        project_name,
        total_project_budget,
        total_contract,
        sum(current_fy_total_recoverable) AS recoverable_amt,
        sum(current_fy_recovered_to_date) AS recoveries_to_date,
        sum(
          current_fy_total_recoverable - current_fy_recovered_to_date
        ) AS balance_remaining,
        fiscal_year
      FROM q2
      GROUP BY project_number,
        project_name,
        total_project_budget,
        total_contract,
        recoverable_amount,
        fiscal_year
      ORDER BY project_number
    ) as base
  `
  ),

  report: (fiscal) => knex.from(reportQueries.main).where({ fiscal_year: fiscal }),

  totals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report")).sum({
      total_project_budget: "total_project_budget",
      total_contract: "total_contract",
      recoverable_amt: "recoverable_amt",
      recoveries_to_date: "recoveries_to_date",
      balance_remaining: "balance_remaining",
    }),
};

// Export an object containing the required fields and the getAll function
module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    try {
      // Use Promise.all to execute all three queries in parallel, providing the 'fiscal' parameter.
      const [fiscalData, report, totals] = await Promise.all([
        reportQueries.fiscal(fiscal), // Fetch fiscal data
        reportQueries.report(fiscal), // Fetch report data
        reportQueries.totals(fiscal), // Fetch totals data
      ]);

      // Create a response object with the required data
      const response = {
        fiscal_year: [fiscalData.fiscal_year],
        report,
        totals,
      };

      return response;
    } catch (error) {
      // If an error occurs, log it for debugging
      console.error("**** MODEL ERROR ****");
      console.error(error);
      // Throw the error back to the controller
      throw error;
    }
  },
};
