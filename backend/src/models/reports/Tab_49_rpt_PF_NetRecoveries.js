const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - GDX Project Net Recoveries report.
 *
 * @param           requestParams fiscal: the fiscal year for this report portfolio_id: the portfolio for this report
 * @returns {any[]}
 */

const handleParams = (query, requestParams) => {
  if (requestParams.fiscal) {
    query.where({
      "q.fiscal": requestParams.fiscal,
      //"q.portfolio_id": requestParams.portfolio_id,
    });
  }
};

const Tab_49_rpt_PF_NetRecoveries = (requestParams) => {
  const query = knex().select("*").fromRaw(
    `(WITH current_year_recoveries_stob_base AS (
      SELECT p.id AS project_id,
        p.project_number,
        p.project_name,
        p.recoverable,
        po.id AS portfolio_id,
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
      FROM data.project_budget AS pb
        LEFT JOIN data.project_deliverable AS pd ON pb.project_deliverable_id = pd.id
        LEFT JOIN data.project AS p ON pd.project_id = p.id
        LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
        LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
    ),
    current_year_recoveries_stob_no_param AS (
      SELECT current_year_recoveries_stob_base.project_id,
        current_year_recoveries_stob_base.project_number,
        current_year_recoveries_stob_base.project_name,
        current_year_recoveries_stob_base.recoverable,
        current_year_recoveries_stob_base.portfolio_id,
        current_year_recoveries_stob_base.portfolio_name,
        current_year_recoveries_stob_base.portfolio_abbrev,
        current_year_recoveries_stob_base.total_project_budget,
        current_year_recoveries_stob_base.recoverable_amount,
        current_year_recoveries_stob_base.stob,
        SUM(
          current_year_recoveries_stob_base.q1_amount + current_year_recoveries_stob_base.q2_amount + current_year_recoveries_stob_base.q3_amount + current_year_recoveries_stob_base.q4_amount
        ) AS current_fy_total_recoverable,
        SUM(
          CASE
            WHEN current_year_recoveries_stob_base.q1_recovered THEN current_year_recoveries_stob_base.q1_amount
            ELSE 0::money
          END + CASE
            WHEN current_year_recoveries_stob_base.q2_recovered THEN current_year_recoveries_stob_base.q2_amount
            ELSE 0::money
          END + CASE
            WHEN current_year_recoveries_stob_base.q3_recovered THEN current_year_recoveries_stob_base.q3_amount
            ELSE 0::money
          END + CASE
            WHEN current_year_recoveries_stob_base.q4_recovered THEN current_year_recoveries_stob_base.q4_amount
            ELSE 0::money
          END
        ) AS current_fy_recovered_to_date,
        current_year_recoveries_stob_base.fiscal_year,
        current_year_recoveries_stob_base.fiscal
      FROM current_year_recoveries_stob_base
      GROUP BY current_year_recoveries_stob_base.project_id,
        current_year_recoveries_stob_base.project_number,
        current_year_recoveries_stob_base.project_name,
        current_year_recoveries_stob_base.recoverable,
        current_year_recoveries_stob_base.portfolio_id,
        current_year_recoveries_stob_base.portfolio_name,
        current_year_recoveries_stob_base.portfolio_abbrev,
        current_year_recoveries_stob_base.total_project_budget,
        current_year_recoveries_stob_base.recoverable_amount,
        current_year_recoveries_stob_base.stob,
        current_year_recoveries_stob_base.fiscal_year,
        current_year_recoveries_stob_base.fiscal
    ),
    financial_recovery_by_portfolio_and_stob_recovered_no_param AS (
      SELECT current_year_recoveries_stob_no_param.project_id,
        current_year_recoveries_stob_no_param.portfolio_id,
        current_year_recoveries_stob_no_param.fiscal_year,
        SUM(
          current_year_recoveries_stob_no_param.current_fy_recovered_to_date
        ) FILTER (
          WHERE current_year_recoveries_stob_no_param.stob IN ('6309', '6310', '6001', '6002', '6398')
        ) AS "contract_costs",
        SUM(
          current_year_recoveries_stob_no_param.current_fy_recovered_to_date
        ) FILTER (
          WHERE current_year_recoveries_stob_no_param.stob LIKE '57%'
        ) AS "travel_costs",
        SUM(
          current_year_recoveries_stob_no_param.current_fy_recovered_to_date
        ) FILTER (
          WHERE current_year_recoveries_stob_no_param.stob LIKE '65%'
        ) AS "business_expenses",
        SUM(
          current_year_recoveries_stob_no_param.current_fy_recovered_to_date
        ) FILTER (
          WHERE current_year_recoveries_stob_no_param.stob LIKE '88%'
        ) AS "staff_recoveries",
        SUM(
          current_year_recoveries_stob_no_param.current_fy_recovered_to_date
        ) FILTER (
          WHERE (
              current_year_recoveries_stob_no_param.stob NOT IN ('6309', '6310', '6001', '6002', '6398')
            )
            AND (
              current_year_recoveries_stob_no_param.stob NOT LIKE '57%'
            )
            AND (
              current_year_recoveries_stob_no_param.stob NOT LIKE '65%'
            )
            AND (
              current_year_recoveries_stob_no_param.stob NOT LIKE '88%'
            )
        ) AS "other"
      FROM current_year_recoveries_stob_no_param
      GROUP BY current_year_recoveries_stob_no_param.project_id,
        current_year_recoveries_stob_no_param.portfolio_id,
        current_year_recoveries_stob_no_param.fiscal_year,
        CASE
          WHEN current_year_recoveries_stob_no_param.stob IN ('6309', '6310', '6001', '6002', '6398') THEN 'contract_costs'
          WHEN current_year_recoveries_stob_no_param.stob LIKE '57%' THEN 'travel_costs'
          WHEN current_year_recoveries_stob_no_param.stob LIKE '65%' THEN 'business_expenses'
          WHEN current_year_recoveries_stob_no_param.stob LIKE '88%' THEN 'staff_recoveries'
          ELSE 'other'
        END
    ) -- Main Query
    SELECT SUM(
        current_year_recoveries_stob_no_param.current_fy_total_recoverable
      ) AS sum_of_current_fy_total_recoverable,
      current_year_recoveries_stob_no_param.project_id,
      current_year_recoveries_stob_no_param.project_number,
      current_year_recoveries_stob_no_param.project_name,
      current_year_recoveries_stob_no_param.portfolio_id,
      current_year_recoveries_stob_no_param.portfolio_name,
      current_year_recoveries_stob_no_param.total_project_budget,
      current_year_recoveries_stob_no_param.fiscal_year AS fy,
      current_year_recoveries_stob_no_param.fiscal,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.contract_costs AS contract_recovered,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.travel_costs AS travel_recovered,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.business_expenses AS business_expense_recovered,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.staff_recoveries AS staff_recoveries_recovered,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.other AS other_recovered,
      SUM(
        current_year_recoveries_stob_no_param.current_fy_recovered_to_date
      ) AS cy_recovered_to_date,
      SUM(
        current_year_recoveries_stob_no_param.current_fy_total_recoverable
      ) AS cy_total_recoverable
    FROM financial_recovery_by_portfolio_and_stob_recovered_no_param
      INNER JOIN current_year_recoveries_stob_no_param ON (
        financial_recovery_by_portfolio_and_stob_recovered_no_param.fiscal_year = current_year_recoveries_stob_no_param.fiscal_year
      )
      AND (
        financial_recovery_by_portfolio_and_stob_recovered_no_param.portfolio_id = current_year_recoveries_stob_no_param.portfolio_id
      )
      AND (
        financial_recovery_by_portfolio_and_stob_recovered_no_param.project_id = current_year_recoveries_stob_no_param.project_id
      ) 
      GROUP BY
      current_year_recoveries_stob_no_param.project_id,
      current_year_recoveries_stob_no_param.project_number,
      current_year_recoveries_stob_no_param.project_name,
      current_year_recoveries_stob_no_param.portfolio_id,
      current_year_recoveries_stob_no_param.portfolio_name,
      current_year_recoveries_stob_no_param.portfolio_abbrev,
      current_year_recoveries_stob_no_param.total_project_budget,
      total_project_budget - recoverable_amount,
      current_year_recoveries_stob_no_param.fiscal_year,
      current_year_recoveries_stob_no_param.fiscal,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.contract_costs,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.travel_costs,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.business_expenses,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.staff_recoveries,
      financial_recovery_by_portfolio_and_stob_recovered_no_param.other
    ORDER BY current_year_recoveries_stob_no_param.portfolio_name,
      current_year_recoveries_stob_no_param.project_number
    ) as q`
  );
  
  handleParams(query, requestParams);
  return query;
};

module.exports = {
  Tab_49_rpt_PF_NetRecoveries,
};
