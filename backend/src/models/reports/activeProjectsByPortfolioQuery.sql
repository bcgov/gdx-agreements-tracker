SELECT project.portfolio_id,
    project.planned_budget,
    portfolio.portfolio_name AS portfolio,
    project.project_number,
    c.last_name || ', ' || c.first_name project_manager,
    project.planned_start_date,
    project.planned_end_date,
    ministry.ministry_short_name AS client_ministry,
    FROM (
        data.portfolio
        RIGHT JOIN data.project ON portfolio.id = project.portfolio_id
        LEFT JOIN data.contact as c ON project.project_manager = c.id
    )
    INNER JOIN data.ministry ON project.ministry_id = ministry.id
WHERE(((project.project_status) = 'Active'))
ORDER BY portfolio,
    project.project_number desc;
SELECT portfolio.id as portfolio_id,
    SUM(project.planned_budget) as TOTAL_BUDGET
FROM (
        data.project
        LEFT JOIN data.portfolio ON portfolio.id = project.portfolio_id
    )
WHERE(project.project_status = 'Active')
GROUP BY portfolio.id;