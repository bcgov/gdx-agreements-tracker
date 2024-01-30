SET search_path = PUBLIC,
  DATA;
SELECT *
FROM (
    WITH clientsponsor AS (
      SELECT cp.project_id,
        c.first_name || ' ' || c.last_name AS full_name
      FROM contact_project AS cp
        JOIN contact_role AS cr ON cp.contact_role = cr.id
        JOIN contact AS c ON cp.contact_id = c.id
        JOIN project ON cp.project_id = project.id
      WHERE cr.role_type = 'ClientSponsor'
    ),
    projectmanager AS (
      SELECT project.id,
        contact.first_name || ' ' || contact.last_name AS full_name
      FROM contact
        JOIN project ON project.project_manager = contact.id
    ),
    clientcontactsubquery AS (
      SELECT p.id AS project_id,
        coalesce(
          cc.client_amount,
          p.total_project_budget
        ) AS project_budget,
        coalesce(
          c_sponsor.full_name,
          cc_client.full_name
        ) AS client_sponsor
      FROM project p
        LEFT JOIN client_coding cc ON cc.project_id = p.id
        LEFT JOIN LATERAL (
          SELECT c.id,
            c.first_name || ' ' || c.last_name AS full_name
          FROM client_coding cc
            RIGHT JOIN portfolio po ON po.id = p.portfolio_id
            LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
            LEFT JOIN contact c ON cc.contact_id = c.id
          WHERE c.id = p.id
        ) AS cc_client ON TRUE
        LEFT JOIN clientsponsor c_sponsor ON c_sponsor.project_id = p.id
    )
    SELECT DISTINCT ON (p.project_number) po.portfolio_abbrev,
      p.project_number,
      p.project_name,
      p.project_type,
      p.description,
      to_char(
        p.planned_start_date,
        'DD-Mon-YY'
      ) AS start_date,
      to_char(
        p.planned_end_date,
        'DD-Mon-YY'
      ) AS end_date,
      cc.project_budget,
      cc.client_sponsor,
      pm.full_name AS project_manager,
      p.fiscal AS fiscalid,
      p.project_type AS projtype
    FROM project p
      LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
      LEFT JOIN ministry m ON p.ministry_id = m.id
      LEFT JOIN portfolio po ON po.id = p.portfolio_id
      LEFT JOIN projectmanager pm ON pm.id = p.id
      LEFT JOIN clientcontactsubquery cc ON cc.project_id = p.id
    ORDER BY p.project_number
  ) AS base
WHERE projtype = 'Internal'
  AND fiscalid = 9