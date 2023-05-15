WITH stob_base AS(
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
    LEFT JOIN data.project_deliverable pd ON pb.project_deliverable_id = pd.id
    LEFT JOIN data.project AS p ON pd.project_id = p.id
    LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
    LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
) -- main query:
SELECT stob_base.fiscal_year,
  stob_base.fiscal,
  stob_base.portfolio_id,
  stob_base.portfolio_name,
  stob_base.portfolio_abbrev,
  SUM(stob_base.q1_amount) AS q1_amount,
  sum(
    CASE
      WHEN left(stob, 2) IN ('57', '65', '63', '60') THEN q1_amount::numeric
      ELSE 0
    END
  )::money AS q1_expenses,
  SUM(stob_base.q2_amount)::money AS q2_amount,
  SUM(
    CASE
      WHEN LEFT(stob, 2) IN ('57', '65', '63', '60') THEN stob_base.q2_amount::numeric
      ELSE 0
    END
  )::money AS q2_expenses,
  SUM(stob_base.q3_amount) AS q3_amount,
  SUM(
    CASE
      WHEN LEFT(stob, 2) IN ('57', '65', '63', '60') THEN stob_base.q3_amount::numeric
      ELSE 0
    END
  )::money AS q3_expenses,
  SUM(stob_base.q4_amount) AS q4_amount,
  SUM(
    CASE
      WHEN LEFT(stob, 2) IN ('57', '65', '63', '60') THEN stob_base.q4_amount::numeric
      ELSE 0
    END
  )::money AS q4_expenses
FROM stob_base
GROUP BY stob_base.fiscal_year,
  stob_base.fiscal,
  stob_base.portfolio_id,
  stob_base.portfolio_name,
  stob_base.portfolio_abbrev;