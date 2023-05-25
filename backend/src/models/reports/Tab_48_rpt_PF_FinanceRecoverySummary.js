const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const handleParams = (query, requestParams) =>
  requestParams?.fiscal &&  query.where("q.fiscal", requestParams.fiscal);

const Tab_48_rpt_PF_FinanceRecoverySummary = (requestParams) => {
  const query = knex.select("*").fromRaw(`(
    WITH base_recoveries AS (
      SELECT pb.project_deliverable_id,
        pb.stob,
        pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount AS recoveries,
        pb.recovery_area
      FROM data.project_budget AS pb
    )
    SELECT po.portfolio_name,
      p.project_number,
      p.project_name,
      sum(br.recoveries) AS current_fy_total_recoverable,
      sum(br.recoveries) filter (
        WHERE br.stob = '6309'
      ) AS consulting_fees,
      sum(br.recoveries) filter (
        WHERE br.stob = '6310'
      ) AS consulting_expenses,
      sum(br.recoveries) filter (
        WHERE br.stob = '6001'
      ) AS operational_contracts_fees,
      sum(br.recoveries) filter (
        WHERE br.stob = '6002'
      ) AS operational_contracts_expenses,
      sum(br.recoveries) filter (
        WHERE br.stob = '5718'
      ) AS i_expenses,
      sum(br.recoveries) filter (
        WHERE br.stob = '8807'
      ) AS salary_costs,
      sum(br.recoveries) filter (
        WHERE br.stob = '8809'
      ) AS operating_costs,
      sum(br.recoveries) filter (
        WHERE br.stob = '6531'
      ) AS project_related_business_expenses,
      sum(br.recoveries) filter (
        WHERE br.stob NOT IN (
            '6531',
            '8809',
            '8807',
            '5718',
            '6002',
            '6001',
            '6310',
            '6309'
          )
      ) AS other_stobs,
      pd.fiscal as fiscal
    FROM base_recoveries AS br
      LEFT JOIN data.project_deliverable AS pd ON br.project_deliverable_id = pd.id
      LEFT JOIN data.project AS p ON pd.project_id = p.id
      LEFT JOIN data.portfolio AS po ON br.recovery_area = po.id
    GROUP BY po.portfolio_name,
      p.project_number,
      p.project_name,
      pd.fiscal
    ORDER BY po.portfolio_name NULLS FIRST,
      p.project_number) as q
  `);

  handleParams(query, requestParams);

  return query;
};

module.exports = {
  Tab_48_rpt_PF_FinanceRecoverySummary,
};
