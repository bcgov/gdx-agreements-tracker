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
        `
        (
          WITH qry_currentyearrecoveries_stob_base AS (
            SELECT p.id project_id,
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
            FROM project_budget pb
              LEFT JOIN project_deliverable pd ON pb.project_deliverable_id = pd.id
              LEFT JOIN project p ON pd.project_id = p.id
              LEFT JOIN fiscal_year fy ON pd.fiscal = fy.id
              LEFT JOIN portfolio po ON pb.recovery_area = po.id
          ),
          q1 AS (
            SELECT project_id,
              project_number,
              project_name,
              recoverable,
              portfolio_id,
              portfolio_name,
              portfolio_abbrev,
              total_project_budget,
              recoverable_amount,
              stob,
              sum(q1_amount + q2_amount + q3_amount + q4_amount) AS currentfytotalrecoverable,
              sum(
                CASE
                  WHEN q1_recovered THEN q1_amount
                  ELSE cast(0 AS MONEY)
                END
              ) + sum(
                CASE
                  WHEN q2_recovered THEN q2_amount
                  ELSE cast(0 AS MONEY)
                END
              ) + sum(
                CASE
                  WHEN q3_recovered THEN q3_amount
                  ELSE cast(0 AS MONEY)
                END
              ) + sum(
                CASE
                  WHEN q4_recovered THEN q4_amount
                  ELSE cast(0 AS MONEY)
                END
              ) AS currentfyrecoveredtodate,
              fiscal_year,
              fiscal
            FROM qry_currentyearrecoveries_stob_base
            GROUP BY portfolio_name,
              project_id,
              project_number,
              project_name,
              fiscal_year,
              fiscal,
              portfolio_id,
              portfolio_abbrev,
              recoverable,
              total_project_budget,
              recoverable_amount,
              stob
          ),
          netsum AS (
            SELECT portfolio_name,
              project_number,
              project_name,
              fiscal,
              fiscal_year,
              stob,
              currentfytotalrecoverable,
              currentfyrecoveredtodate,
              sum(
                CASE
                  WHEN stob IN ('6309', '6310', '6001', '6002', '6398') THEN currentfyrecoveredtodate
                END
              ) AS contractcosts,
              sum(
                CASE
                  WHEN stob like ('57%') THEN currentfyrecoveredtodate
                END
              ) AS travelcosts,
              sum(
                CASE
                  WHEN stob like ('65%') THEN currentfyrecoveredtodate
                END
              ) AS businessexpenses,
              sum(
                CASE
                  WHEN stob like ('88%') THEN currentfyrecoveredtodate
                END
              ) AS staffrecoveries,
              sum(
                CASE
                  WHEN stob NOT IN ('6309', '6310', '6001', '6002', '6398')
                  AND stob not like ('57%')
                  AND stob not like ('65%')
                  AND stob not like ('88%') THEN currentfyrecoveredtodate
                END
              ) AS other
            FROM q1

            GROUP BY portfolio_name,
              project_number,
              project_name,
              fiscal_year,
              fiscal,
              stob,
              currentfytotalrecoverable,
              currentfyrecoveredtodate
            ORDER BY portfolio_name,
              project_number,
              project_name,
              fiscal_year ASC
          ) --  last of three with clauses

          -- main SELECT clause
          SELECT portfolio_name,
            project_number,
            project_name,
            sum(currentfytotalrecoverable) AS cy_total_recoverable,
            sum(coalesce(contractcosts, cast(0 AS MONEY))) AS contract_costs,
            sum(coalesce(contractcosts, cast(0 AS MONEY))) AS contract_recovered,
            sum(coalesce(travelcosts, cast(0 AS MONEY))) AS travel_costs,
            sum(coalesce(travelcosts, cast(0 AS MONEY))) AS travel_recovered,
            sum(coalesce(businessexpenses, cast(0 AS MONEY))) AS business_expenses,
            sum(coalesce(businessexpenses, cast(0 AS MONEY))) AS business_expenses_recovered,
            sum(coalesce(staffrecoveries, cast(0 AS MONEY))) AS staff_recoveries,
            sum(coalesce(staffrecoveries, cast(0 AS MONEY))) AS staff_recoveries_recovered,
            sum(coalesce(other, cast(0 AS MONEY))) AS other,
            sum(coalesce(other, cast(0 AS MONEY))) AS other_recovered,
            fiscal
          FROM netsum
          GROUP BY portfolio_name,
            project_number,
            project_name,
            fiscal_year,
            fiscal
          ORDER BY portfolio_name,
            project_number,
            fiscal_year,
            fiscal ASC
        ) as base`
      )
      .where({
        fiscal: fiscal,
      }),

  totals: ({ fiscal }) =>
    knex(queries.report({ fiscal }).as("report")).sum({
      cy_total_recoverable: "cy_total_recoverable",
      contract_costs: "contract_costs",
      contract_recovered: "contract_recovered",
      travel_costs: "travel_costs",
      travel_recovered: "travel_recovered",
      business_expenses: "business_expenses",
      business_expenses_recovered: "business_expenses_recovered",
      staff_recoveries: "staff_recoveries",
      staff_recoveries_recovered: "staff_recoveries_recovered",
      other: "other",
      other_recovered: "other_recovered",
    }),
};

module.exports = {
  required: ["fiscal"], // e.g. fiscal, date, or portfolio

  /**
   * Retrieve all data related to a given fiscal period.
   * This function uses asynchronous execution to fetch data from three different queries in parallel.
   * It waits for all the promises to resolve and then returns the collected data.
   *
   * @param   {object} params        - An object containing the parameters for the queries.
   * @param   {string} params.fiscal - The fiscal period for which data is to be retrieved.
   * @returns {object}               - An object containing the fetched data for different aspects:
   *                                 - fiscal: The result of the 'fiscal' query.
   *                                 - report: The result of the 'report' query.
   *                                 - totals: The result of the 'totals' query.
   */
  getAll: async ({ fiscal }) => {
    // Use Promise.all to execute all three queries in parallel, providing the 'fiscal' parameter.
    const allResults = await Promise.all([
      queries?.fiscal({ fiscal }),
      queries?.report({ fiscal }),
      queries?.totals({ fiscal }),
    ]);

    // Extract the results from the 'allResults' array into individual variables.
    const [{ fiscal_year }, reportResult, totalsResult] = allResults;

    // Create a result object with the fetched data for each aspect of the fiscal period.
    const result = {
      fiscal: fiscal_year, // The result of the 'fiscal' query.
      report: reportResult, // The result of the 'report' query.
      totals: totalsResult, // The result of the 'totals' query.
    };

    // Return the result object containing all the fetched data.
    return result;
  },
};
