SELECT jv.project_id,
  jv.jv_number,
  jv.billed_date,
  project.project_number,
  project.project_name,
  jv.amount,
  fiscal_year.fiscal_year,
  jv.fiscal_year_id AS fiscal,
  jv.quarter
FROM data.fiscal_year
  INNER JOIN (
    data.project
    RIGHT JOIN data.jv ON project.id = jv.project_id
  ) ON data.fiscal_year.id = jv.fiscal_year_id
ORDER BY project.project_number;