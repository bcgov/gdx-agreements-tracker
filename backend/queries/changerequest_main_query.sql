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
SELECT qry_cr.fiscal_year AS "fiscacl_year",
  qry_cr.project_number AS "project_number",
  qry_cr.project_name AS "project_name",
  qry_cr.fiscal_year AS "fiscal_year",
  qry_cr.initiated_by AS "initiated_by",
  cr_cb.cr_count AS "change_request_count",
  qry_cr.budget AS "change_request_budget",
  qry_cr.schedule AS "change_request_schedule",
  qry_cr.scope AS "change_request_scope",
  qry_cr.none AS "change_request_none"
FROM qry_changerequest_count_by_initiated_by as cr_cb
  INNER JOIN qry_changerequest_xtab as qry_cr ON (
    cr_cb.initiated_by = qry_cr.initiated_by
    AND cr_cb.project_id = qry_cr.project_id
    AND cr_cb.fiscal_year_id = qry_cr.fiscal_year_id
  )
WHERE (
    EXISTS (
      SELECT *
      FROM data.project_deliverable AS pd
        INNER JOIN (
          data.project_budget as pb
          INNER JOIN data.fiscal_year as fy_sub ON pb.fiscal = fy_sub.id
        ) ON pd.id = pb.project_deliverable_id
      WHERE (fy_sub.fiscal_year = "21-22")
        AND pd.project_id = qry_cr.project_id
    )
  );