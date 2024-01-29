SET search_path = PUBLIC,
  DATA;
SELECT p.project_number,
  p.project_name,
  pf.portfolio_abbrev,
  p.description,
  p.ministry_id,
  m.ministry_name,
  m.ministry_short_name,
  to_char(p.planned_start_date, 'DD-Mon-YY') AS start_date,
  to_char(p.planned_end_date, 'DD-Mon-YY') AS end_date,
  coalesce(
    cc.client_amount,
    p.total_project_budget
  ) AS total_project_budget,
  pf.portfolio_name,
  (
    SELECT CASE
        WHEN cc.client_amount IS NULL THEN (
          SELECT c.first_name || ' ' || c.last_name AS full_name
          FROM contact_project cp
            JOIN contact_role cr ON cp.contact_role = cr.id
            JOIN contact c ON cp.contact_id = c.id
            JOIN project ON cp.project_id = project.id
          WHERE cr.role_type = 'ClientSponsor'
            AND project.id = p.id
        )
        ELSE (
          SELECT c.first_name || ' ' || c.last_name
          FROM client_coding cc
            RIGHT JOIN portfolio po ON po.id = p.portfolio_id
            LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
            LEFT JOIN contact c ON cc.contact_id = c.id
          WHERE fy.id = 9
            AND c.id = p.id
        )
      END
  ) AS client_sponsor,
  (
    SELECT contact.first_name || ' ' || contact.last_name
    FROM contact
      JOIN project ON project.project_manager = contact.id
    WHERE project.id = p.id
  ) AS project_manager,
  fy.fiscal_year,
  p.project_type
FROM project p
  LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
  LEFT JOIN ministry m ON p.ministry_id = m.id
  LEFT JOIN portfolio pf ON pf.id = p.portfolio_id
  LEFT JOIN client_coding cc ON cc.project_id = p.id
WHERE p.project_type = 'Internal'
  AND fy.id = 9
UNION ALL
SELECT hp.project_number,
  hp.project_name,
  pf.portfolio_abbrev,
  hp.description,
  hp.ministry_id,
  m.ministry_name,
  m.ministry_short_name,
  to_char(hp.start_date, 'DD-Mon-YY') AS start_date,
  to_char(hp.end_date, 'DD-Mon-YY') AS end_date,
  hp.total_project_budget,
  pf.portfolio_name,
  NULL AS client_sponsor,
  hp.project_manager,
  fy.fiscal_year,
  hp.project_type
FROM historical_projects hp
  INNER JOIN portfolio pf ON pf.id = hp.portfolio_id
  INNER JOIN ministry m ON m.id = hp.ministry_id
  INNER JOIN fiscal_year fy ON hp.fiscal_year = fy.id
WHERE fy.id = 9
  AND hp.project_type = 'Internal'
ORDER BY project_number