SET search_path = DATA,
  PUBLIC;
SELECT po.portfolio_name,
  p.project_number AS "#",
  p.project_name AS name,
  (
    SELECT first_name || ' ' || last_name
    FROM contact
    WHERE id = p.project_manager
  ) AS project_manager,
  p.description,
  to_char(p.initiation_date, 'dd-Mon-yy'),
  to_char(p.planned_start_date, 'dd-Mon-yy') AS start_date,
  to_char(p.planned_end_date, 'dd-Mon-yy') AS end_date,
  p.planned_budget,
  m.ministry_short_name AS ministry
FROM portfolio po
  RIGHT JOIN project p ON po.id = p.portfolio_id
  INNER JOIN ministry m ON p.ministry_id = m.id
WHERE p.initiation_date >= to_date('20-09-2020', 'dd-mm-yyyy')
GROUP BY po.portfolio_name,
  p.project_number,
  p.project_name,
  p.project_manager,
  p.description,
  p.initiation_date,
  p.planned_start_date,
  p.planned_end_date,
  p.planned_budget,
  m.ministry_short_name
ORDER BY po.portfolio_name,
  p.project_number;