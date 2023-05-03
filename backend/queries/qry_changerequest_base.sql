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
  GROUP BY fiscal_year_id,
    fy.fiscal_year,
    p.id,
    p.project_number,
    p.project_name,
    initiated_by,
    crtype_name
)
select *
from qry_changerequest_base as q
GROUP BY q.fiscal_year_id,
  q.fiscal_year,
  q.project_id,
  q.project_number,
  q.project_name,
  q.initiated_by,
  q.crtype_name,
  q.count_by_type
order by q.project_id,
  q.fiscal_year_id