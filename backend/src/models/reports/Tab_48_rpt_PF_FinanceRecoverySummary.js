const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - finance recovery summary forecast by fiscal
 *
 * @param           requestParams fiscal: the fiscal year for this report
 * @returns {any[]}
 */

const handleParams = (query, requestParams) => {
  if (requestParams.fiscal) {
    query.where("q.fiscal", requestParams.fiscal);
  }
};

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

// get the fiscal year based on the id passed from frontend
const getFiscalYear = (requestParams) => {
  const query = knex.select(knex.raw(`fiscal_year from data.fiscal_year`));

  if (requestParams.fiscal) {
    query.where({ "fiscal_year.id": requestParams.fiscal });
  }

  return query;
};
const Tab_48_totals = (requestParams) => {
  const query = knex.select("*").fromRaw(`(
      SELECT br.portfolio_name,
            sum(br.recoveries) AS totals_recoveries,
            sum(br.recoveries) filter (WHERE br.stob = '6309') AS consulting_fees,
            sum(br.recoveries) filter (WHERE br.stob = '6310') AS consulting_expenses,
            sum(br.recoveries) filter (WHERE br.stob = '6001') AS operational_contracts_fees,
            sum(br.recoveries) filter (WHERE br.stob = '6002') AS operational_contracts_expenses,
            sum(br.recoveries) filter (WHERE br.stob = '5718') AS i_expenses,
            sum(br.recoveries) filter (WHERE br.stob = '8807') AS salary_costs,
            sum(br.recoveries) filter (WHERE br.stob = '8809') AS operating_costs,
            sum(br.recoveries) filter (WHERE br.stob = '6531') AS project_related_business_expenses,
            sum(br.recoveries) filter (WHERE br.stob NOT IN ('6531', '8809', '8807', '5718', '6002', '6001', '6310', '6309')) AS other_stobs,
            br.fiscal AS fiscal
        FROM (
              SELECT po.id,
                    po.portfolio_name,
                    pb.stob,
                    (pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount) AS recoveries,
                    pd.fiscal
                FROM data.project_budget AS pb
                LEFT JOIN data.project_deliverable pd
                  ON pb.project_deliverable_id = pd.id
                LEFT JOIN data.project AS p
                  ON pd.project_id = p.id
                LEFT JOIN data.fiscal_year AS fy
                  ON pd.fiscal = fy.id
                LEFT JOIN data.portfolio AS po
                  ON pb.recovery_area = po.id
            ) AS br
      GROUP BY br.portfolio_name,
                br.fiscal
      ORDER BY br.portfolio_name
      ) as q
  `);

  handleParams(query, requestParams);

  return query;
};

const Tab_48_grand_totals = (requestParams) => {
  const query = knex.select("*").fromRaw(`(
    SELECT fiscal,
      sum(totals_recoveries) AS total_recoveries_sum,
      sum(consulting_fees) AS consulting_fees_sum,
      sum(consulting_expenses) AS consulting_expenses_sum,
      sum(operational_contracts_fees) AS operational_contracts_fees_sum,
      sum(operational_contracts_expenses) AS operational_contracts_expenses_sum,
      sum(i_expenses) AS i_expenses_sum,
      sum(salary_costs) AS salary_costs_sum,
      sum(operating_costs) AS operating_costs_sum,
      sum(project_related_business_expenses) AS project_related_business_expenses_sum,
      sum(other_stobs) AS other_stobs_sum
    FROM (
        SELECT br.portfolio_name,
          sum(br.recoveries) AS totals_recoveries,
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
            br.fiscal
          FROM (
              SELECT po.id,
                po.portfolio_name,
                pb.stob,
                sum(
                  pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
                ) AS recoveries,
                pd.fiscal
              FROM data.project_budget AS pb
                LEFT JOIN data.project_deliverable pd ON pb.project_deliverable_id = pd.id
                LEFT JOIN data.project AS p ON pd.project_id = p.id
                LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
                LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
              GROUP BY po.id,
                pb.stob,
                pd.fiscal
            ) AS br
          GROUP BY br.portfolio_name,
            br.fiscal
          ORDER BY br.portfolio_name
        ) AS subquery
      GROUP BY subquery.fiscal
    ) as q`);

  handleParams(query, requestParams);

  return query;
};

module.exports = {
  Tab_48_rpt_PF_FinanceRecoverySummary,
  Tab_48_totals,
  Tab_48_grand_totals,
  getFiscalYear,
};
