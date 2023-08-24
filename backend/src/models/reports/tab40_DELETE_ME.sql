/*
 Fiscal_Year example 20
 'Enter Portfolio Abbreviation or '"All"'  This would be either all portfolio_Abbrev 'All' or just one 'SD'
 case when 'SD'='All' then Portfolio_Abbrev else 'SD' end
 */
SET search_path = DATA,
  PUBLIC;
SELECT po.portfolio_name,
  p.project_number,
  p.project_name,
  fy.fiscal_year,
  p.portfolio_id,
  sum(pb.q1_amount) AS q1,
  sum(pb.q2_amount) AS q2,
  sum(pb.q3_amount) AS q3,
  sum(pb.q4_amount) AS q4,
  sum(
    pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
  ) AS total
FROM project p
  RIGHT JOIN (
    (
      fiscal_year fy
      RIGHT JOIN project_deliverable pd ON fy.id = pd.fiscal
    )
    RIGHT JOIN (
      portfolio po
      RIGHT JOIN project_budget pb ON po.id = pb.recovery_area
    ) ON pd.id = pb.project_deliverable_id
  ) ON p.id = pd.project_id
WHERE (left(pb.stob, 2) NOT IN ('63', '57'))
GROUP BY po.portfolio_name,
  p.project_number,
  p.project_name,
  fy.fiscal_year,
  fy.id,
  pb.recovery_area,
  pb.stob,
  p.portfolio_id,
  po.portfolio_abbrev
HAVING fy.id = 12
  AND pb.stob = '8809'
  AND (
    portfolio_abbrev = CASE
      WHEN 'All' = 'All' THEN portfolio_abbrev
      ELSE 'All'
    END
  )
ORDER BY portfolio_name,
  project_number,
  fiscal_year DESC;