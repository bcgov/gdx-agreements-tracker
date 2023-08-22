--/*Parameter Fiscal_Year='20-21' */
SET search_path = DATA,
  PUBLIC;
WITH q1 AS (
  SELECT fy.id AS fiscal_year_id,
    fy.fiscal_year,
    p.id AS project_id,
    p.project_number,
    p.project_name,
    coalesce(cr.initiated_by, 'None') AS initiated_by,
    coalesce(crt.crtype_name, 'None') AS cr_type,
    count(*) AS count_by_type
  FROM (
      change_request_crtype crcrt
      RIGHT JOIN (
        (
          change_request cr
          INNER JOIN fiscal_year fy ON cr.fiscal_year = fy.id
        )
        INNER JOIN project p ON cr.link_id = p.id
      ) ON crcrt.change_request_id = cr.id
    )
    LEFT JOIN crtype crt ON crcrt.crtype_id = crt.id
  GROUP BY fy.id,
    fy.fiscal_year,
    p.id,
    p.project_number,
    p.project_name,
    cr.initiated_by,
    crt.crtype_name
),
q2 AS (
  SELECT q1.fiscal_year_id,
    q1.fiscal_year,
    q1.project_number,
    q1.project_id,
    q1.project_name,
    q1.initiated_by,
    sum(
      CASE
        WHEN q1.cr_type = 'Budget' THEN q1.count_by_type
        ELSE NULL
      END
    ) AS budget,
    sum(
      CASE
        WHEN q1.cr_type = 'Schedule' THEN q1.count_by_type
        ELSE NULL
      END
    ) AS schedule,
    sum(
      CASE
        WHEN q1.cr_type = 'Scope' THEN q1.count_by_type
        ELSE NULL
      END
    ) AS SCOPE,
    sum(
      CASE
        WHEN q1.cr_type = 'None' THEN q1.count_by_type
        ELSE NULL
      END
    ) AS NONE
  FROM q1
  GROUP BY q1.fiscal_year_id,
    q1.fiscal_year,
    q1.project_number,
    q1.project_id,
    q1.project_name,
    q1.initiated_by
),
q3 AS (
  SELECT cr.fiscal_year AS fiscal_year_id,
    cr.link_id AS project_id,
    coalesce(cr.initiated_by, 'None') AS initiated_by,
    count(*) AS cr_count
  FROM change_request cr
  GROUP BY cr.fiscal_year,
    cr.link_id,
    coalesce(cr.initiated_by, 'None')
)
SELECT q2.project_number,
  q2.project_name,
  q2.fiscal_year,
  q3.cr_count,
  q2.initiated_by,
  q2.budget,
  q2.schedule,
  q2.scope,
  q2.none
FROM q3
  INNER JOIN q2 ON (q3.initiated_by = q2.initiated_by)
  AND (q3.project_id = q2.project_id)
  AND (q3.fiscal_year_id = q2.fiscal_year_id)
WHERE (
    exists (
      SELECT *
      FROM project_deliverable pd
        INNER JOIN project_budget pb
        INNER JOIN fiscal_year fy ON pb.fiscal = fy.id ON pd.id = pb.project_deliverable_id
      WHERE fy.fiscal_year = '20-21'
        AND pd.project_id = q2.project_id
    ) <> FALSE
  )
ORDER BY project_number,
  fiscal_year;