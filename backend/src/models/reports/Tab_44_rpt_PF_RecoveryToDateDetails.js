// libs
const { knex } = require("@database/databaseConnection")();

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: ({ fiscal }) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: ({ fiscal }) =>
    knex
      .select()
      .fromRaw(
        `(
        WITH q1 AS (
          SELECT c.project_id,
            c.fiscal,
            sum(c.total_fee_amount) AS fees,
            sum(c.total_expense_amount) AS expenses,
            sum(total_fee_amount + total_expense_amount) AS total_contract
          FROM contract c
          GROUP BY c.project_id,
            c.fiscal
          HAVING c.project_id IS NOT NULL
        ),
        q2 AS (
          SELECT p.project_number,
            p.project_name,
            p.total_project_budget,
            q1.total_contract,
            p.recoverable_amount,
            sum(q1_amount + q2_amount + q3_amount + q4_amount) AS current_fy_total_recoverable,
            sum(
              CASE
                WHEN q1_recovered THEN q1_amount
                ELSE cast(0 AS MONEY)
              END + CASE
                WHEN q2_recovered THEN q2_amount
                ELSE cast(0 AS MONEY)
              END + CASE
                WHEN q3_recovered THEN q3_amount
                ELSE cast(0 AS MONEY)
              END + CASE
                WHEN q4_recovered THEN q4_amount
                ELSE cast(0 AS MONEY)
              END
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
        )
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
        ) as base`
      )
      .where({
        fiscal_year: fiscal,
      }),
};

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    try {
      // Use Promise.all to execute all three queries in parallel, providing the 'fiscal' parameter.
      const fetchedQueryResults = await Promise.all([
        queries?.fiscal({ fiscal }),
        queries?.report({ fiscal }),
        //queries?.totals({ fiscal }),
      ]);

      // Extract the results from the fetched Query Results into individual variables
      const [
        { fiscal_year }, // the result of the 'fiscal' query
        report, // the result of the 'report' query
        //totals, // the result of the 'totals' query
      ] = fetchedQueryResults;

      // Log the result object in a readable format to the console.
      // todo: remove this once we hit MVP by mid-September.
      console.warn(JSON.stringify(fetchedQueryResults, null, 2));

      // create a result object with the fetched data for each section of the report
      // can shape the result as required, e.g. using map or groupByProperty to add sections
      const shapedResult = {
        fiscal: fiscal_year,
        report,
        // totals,
        // add more here, such as 'grand_totals'
      };

      // finally, return the shaped result
      return shapedResult;
    } catch (error) {
      console.error(`
        Model error!:
        query parameter received: ${JSON.stringify(fiscal)}
        **** ${error} ****
        returning NULL!.
      `);

      return null;
    }
  },
};
