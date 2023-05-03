-- Query: qry_changerequest_count_by_initiated_by
-- SQL:
WITH qry_changerequest_count_by_initiated_by AS (
  SELECT cr.link_id AS project_id,
    cr.fiscal_year AS fiscal_year_id,
    coalesce(cr.initiated_by, 'None') AS initiated_by,
    count(*) AS cr_count
  FROM data.change_request AS cr
  GROUP BY project_id,
    fiscal_year_id,
    initiated_by
  ORDER BY project_id
)
SELECT *
FROM qry_changerequest_count_by_initiated_by