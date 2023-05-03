WITH qry_changerequest_base AS (
  SELECT fy.id AS fiscal_year_id,
    fy.fiscal_year,
    p.id AS project_id,
    p.project_number,
    p.project_name,
    coalesce(cr.initiated_by, 'None') AS initiated_by,
    coalesce(ct.crtype_name, 'None') AS crtype_name,
    count(*) AS count_by_type
  FROM data.change_request_crtype AS cr_ct
    RIGHT JOIN data.change_request AS cr ON cr_ct.change_request_id = cr.id
    INNER JOIN data.fiscal_year AS fy ON cr.fiscal_year = fy.id
    INNER JOIN data.project AS p ON cr.link_id = p.id
    LEFT JOIN data.crtype AS ct ON cr_ct.crtype_id = ct.id
  GROUP BY fy.id,
    fy.fiscal_year,
    p.id,
    p.project_number,
    p.project_name,
    initiated_by,
    crtype_name
)
SELECT q.fiscal_year_id,
  q.fiscal_year,
  q.project_number,
  q.project_id,
  q.project_name,
  q.initiated_by,
  SUM(
    CASE
      WHEN q.crtype_name = 'budget' THEN q.count_by_type
      ELSE 0
    END
  ) AS budget,
  SUM(
    CASE
      WHEN q.crtype_name = 'schedule' THEN q.count_by_type
      ELSE 0
    END
  ) AS schedule,
  SUM(
    CASE
      WHEN q.crtype_name = 'scope' THEN q.count_by_type
      ELSE 0
    END
  ) AS scope,
  SUM(
    CASE
      WHEN q.crtype_name = 'none' THEN q.count_by_type
      ELSE 0
    END
  ) AS none
FROM qry_changerequest_base AS q
GROUP BY q.fiscal_year_id,
  q.fiscal_year,
  q.project_number,
  q.project_id,
  q.project_name,
  q.initiated_by,
  q.crtype_name;