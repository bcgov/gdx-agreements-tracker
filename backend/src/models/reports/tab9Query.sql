SET search_path = PUBLIC,
  DATA;
WITH q1 AS (
  SELECT c.id contract_id,
    c.co_number,
    coalesce(t.fiscal, c.fiscal) fiscal,
    coalesce(fy.fiscal_year, fy_d.fiscal_year) fiscal_year,
    sic.portfolio_id,
    po.portfolio_name,
    po.portfolio_abbrev,
    c.start_date,
    p.project_number,
    c.end_date,
    c.status,
    coalesce(t.total_fee_amount, c.total_fee_amount) total_fee_amount,
    coalesce(t.total_expense_amount, c.total_expense_amount) total_expense_amount
  FROM contract c
    INNER JOIN fiscal_year fy_d ON c.fiscal = fy_d.id
    LEFT JOIN (
      SELECT contract_id,
        fiscal,
        sum(total_fee_amount) total_fee_amount,
        sum(total_expense_amount) total_expense_amount
      FROM (
          SELECT contract_id,
            fiscal,
            sum(hours * assignment_rate) total_fee_amount,
            NULL total_expense_amount
          FROM contract_resource
          GROUP BY contract_id,
            fiscal
          UNION
          SELECT contract_id,
            fiscal,
            sum(
              CASE
                WHEN is_expense = FALSE THEN deliverable_amount
                ELSE cast(0 AS MONEY)
              END
            ),
            sum(
              CASE
                WHEN is_expense = TRUE THEN deliverable_amount
                ELSE cast(0 AS MONEY)
              END
            )
          FROM contract_deliverable
          GROUP BY contract_id,
            fiscal
        ) t_sub
      GROUP BY contract_id,
        fiscal
    ) t ON c.id = t.contract_id
    LEFT JOIN fiscal_year fy ON t.fiscal = fy.id
    LEFT JOIN project p ON c.project_id = p.id
    LEFT JOIN LATERAL (
      SELECT portfolio_id
      FROM sid_internal_coding
      WHERE contract_id = c.id
      LIMIT 1
    ) sic ON TRUE
    LEFT JOIN portfolio po ON po.id = sic.portfolio_id
),
q2 AS (
  SELECT c.fiscal AS fiscal_year_id,
    c.fiscal_year,
    c.co_number,
    c.total_fee_amount + c.total_expense_amount AS total_fees_and_expenses,
    extract(
      DAY
      FROM c.end_date - c.start_date
    ) AS duration,
    right(
      coalesce(co_version, 'A0'),
      length(coalesce(co_version, 'A0')) -1
    )::int AS amendment_count,
    count(*) AS resource_count
  FROM (
      q1 AS c
      LEFT JOIN contract_resource ON (c.fiscal = contract_resource.fiscal)
      AND (c.contract_id = contract_resource.contract_id)
    )
    INNER JOIN contract ON c.contract_id = contract.id
  GROUP BY c.fiscal,
    c.fiscal_year,
    c.co_number,
    c.total_fee_amount,
    c.total_expense_amount,
    c.start_date,
    c.end_date,
    co_version
  UNION ALL
  SELECT fy.id,
    fy.fiscal_year,
    hc.co_number,
    hc.total_contract_amount AS total_fees_and_expenses,
    extract(
      DAY
      FROM end_date - start_date
    ) AS duration,
    hc.amendment_count,
    count(*) AS resource_count
  FROM (
      fiscal_year fy
      INNER JOIN historical_contracts hc ON fy.id = hc.fiscal_year
    )
    LEFT JOIN historical_contract_assignments hca ON hc.co_number = hca.co_number
  GROUP BY fy.id,
    fy.fiscal_year,
    hc.co_number,
    hc.total_contract_amount,
    start_date,
    end_date,
    hc.amendment_count
)
SELECT q2.fiscal_year,
  count(*) AS contract_count,
  sum(q2.total_fees_and_expenses) AS total_fees_and_expenses,
  round(avg(duration), 0) AS average_duration,
  sum(q2.amendment_count) AS total_contract_amendments,
  sum(
    CASE
      WHEN amendment_count = 0 THEN 0
      ELSE 1
    END
  ) AS contracts_with_amendments,
  round(
    sum(q2.amendment_count)::numeric / sum(
      CASE
        WHEN amendment_count = 0 THEN 0
        ELSE 1
      END
    ),
    2
  ) AS average_amendments_per_contract,
  sum(q2.resource_count) AS resource_count
FROM q2
GROUP BY q2.fiscal_year_id,
  q2.fiscal_year
ORDER BY fiscal_year;