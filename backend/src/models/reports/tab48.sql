SELECT fiscal,
  SUM(totals_recoveries) AS total_recoveries_sum,
  SUM(consulting_fees) AS consulting_fees_sum,
  SUM(consulting_expenses) AS consulting_expenses_sum,
  SUM(operational_contracts_fees) AS operational_contracts_fees_sum,
  SUM(operational_contracts_expenses) AS operational_contracts_expenses_sum,
  SUM(i_expenses) AS i_expenses_sum,
  SUM(salary_costs) AS salary_costs_sum,
  SUM(operating_costs) AS operating_costs_sum,
  SUM(project_related_business_expenses) AS project_related_business_expenses_sum,
  SUM(other_stobs) AS other_stobs_sum
FROM (
    SELECT po.portfolio_name,
      pb.stob,
      SUM(
        pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
      ) AS recoveries,
      pd.fiscal,
      SUM(
        pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
      ) AS totals_recoveries,
      SUM(
        CASE
          WHEN pb.stob = '6309' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS consulting_fees,
      SUM(
        CASE
          WHEN pb.stob = '6310' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS consulting_expenses,
      SUM(
        CASE
          WHEN pb.stob = '6001' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS operational_contracts_fees,
      SUM(
        CASE
          WHEN pb.stob = '6002' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS operational_contracts_expenses,
      SUM(
        CASE
          WHEN pb.stob = '5718' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS i_expenses,
      SUM(
        CASE
          WHEN pb.stob = '8807' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS salary_costs,
      SUM(
        CASE
          WHEN pb.stob = '8809' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS operating_costs,
      SUM(
        CASE
          WHEN pb.stob = '6531' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS project_related_business_expenses,
      SUM(
        CASE
          WHEN pb.stob NOT IN (
            '6531',
            '8809',
            '8807',
            '5718',
            '6002',
            '6001',
            '6310',
            '6309'
          ) THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
        END
      ) AS other_stobs
    FROM data.project_budget AS pb
      LEFT JOIN data.project_deliverable pd ON pb.project_deliverable_id = pd.id
      LEFT JOIN data.project AS p ON pd.project_id = p.id
      LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
      LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
    GROUP BY po.portfolio_name,
      pb.stob,
      pd.fiscal
  ) AS subquery
GROUP BY fiscal