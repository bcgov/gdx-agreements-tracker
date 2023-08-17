SET search_path = public,
  data;
WITH q1 AS (
  SELECT c.fiscal AS fiscal_year_id,
    COUNT(*) AS amendment_count,
    c.contract_type
  FROM contract c
    INNER JOIN contract_amendment ca ON c.id = ca.contract_id
  WHERE c.contract_type = 'ChangeOrder'
  GROUP BY c.fiscal,
    c.contract_type
),
q2 AS (
  SELECT fy.fiscal_year,
    c.co_number,
    q1.amendment_count,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'Resources' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS resources,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'Scope' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS scope,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'Budget' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS budget,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'Hours' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS hours,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'Timelines' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS timelines,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'End Date' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS end_date,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'Expenses' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS expenses,
    COUNT(
      CASE
        WHEN at.amendment_type_name = 'Admin' THEN at.amendment_type_name
        ELSE NULL
      END
    ) AS admin
  FROM (
      contract_amendment_amendment_type caat
      LEFT JOIN amendment_type at ON caat.amendment_type_id = at.id
    )
    RIGHT JOIN (
      (
        q1
        INNER JOIN (
          contract c
          INNER JOIN fiscal_year fy ON c.fiscal = fy.id
        ) ON q1.fiscal_year_id = fy.id
      )
      LEFT JOIN contract_amendment ca ON c.id = ca.contract_id
    ) ON caat.contract_amendment_id = ca.id
  GROUP BY fy.fiscal_year,
    c.co_number,
    q1.amendment_count
)
SELECT q2.fiscal_year,
  COUNT(*) AS contract_count,
  q2.amendment_count,
  SUM(q2.resources) AS resources,
  SUM(q2.budget) AS budget,
  SUM(q2.timelines) AS timelines,
  SUM(q2.scope) AS scope,
  SUM(q2.hours) AS hours,
  SUM(q2.expenses) AS expenses,
  SUM(q2.end_date) AS end_date,
  SUM(q2.admin) AS admin
FROM q2
GROUP BY q2.fiscal_year,
  q2.amendment_count
ORDER BY fiscal_year;