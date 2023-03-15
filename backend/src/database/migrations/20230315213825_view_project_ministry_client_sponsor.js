const projects_by_ministry = `
 CREATE VIEW data.v_projects_by_ministry as
 WITH client_sponsor_list AS (
         SELECT string_agg((c.first_name::text || ' '::text) || c.last_name::text, ', '::text ORDER BY c.first_name, c.last_name) AS client_sponsor,
            p.project_number,
            cp.project_id
           FROM data.contact_project cp
             JOIN data.contact c ON cp.contact_id = c.id
             JOIN data.project p ON p.id = cp.project_id
          WHERE cp.contact_role = 1
          GROUP BY p.project_number, cp.project_id
        )
 SELECT projectbyministry.ministry_name,
    projectbyministry.portfolio_abbrev,
    projectbyministry.project_number,
    projectbyministry.project_name,
    projectbyministry.project_type,
    projectbyministry.description,
    projectbyministry.planned_start_date,
    projectbyministry.planned_end_date,
    projectbyministry.total_project_budget,
    projectbyministry.client_sponsor_name,
    projectbyministry.project_manager,
    projectbyministry.portfolio_id,
    projectbyministry.ministry_id,
    projectbyministry.ministry_short_name,
    projectbyministry.portfolio_name,
    projectbyministry.fiscal_year,
    projectbyministry.fiscal_year_id
   FROM ( SELECT ministry.ministry_name,
            portfolio.portfolio_abbrev,
            project.project_number,
            project.project_name,
            project.project_type,
            project.description,
            project.planned_start_date,
            project.planned_end_date,
            COALESCE(client_coding.client_amount, project.total_project_budget) AS total_project_budget,
                CASE
                    WHEN client_coding.client_amount IS NULL THEN client_sponsor_list.client_sponsor
                    ELSE (contact.first_name::text || ' '::text) || contact.last_name::text
                END AS client_sponsor_name,
            (c.first_name::text || ' '::text) || c.last_name::text AS project_manager,
            portfolio.id AS portfolio_id,
            project.ministry_id,
            ministry.ministry_short_name,
            portfolio.portfolio_name,
            fiscal_year.fiscal_year,
            fiscal_year.id AS fiscal_year_id
           FROM data.client_coding
             RIGHT JOIN (data.portfolio
             RIGHT JOIN data.project ON portfolio.id = project.portfolio_id
             LEFT JOIN data.fiscal_year fiscal_year ON project.fiscal = fiscal_year.id
             LEFT JOIN data.ministry ministry ON project.ministry_id = ministry.id) ON client_coding.project_id = project.id
             LEFT JOIN data.contact contact ON client_coding.contact_id = contact.id
             LEFT JOIN data.contact c ON project.project_manager = c.id
             LEFT JOIN client_sponsor_list ON client_sponsor_list.project_id = project.id
        UNION ALL
         SELECT ministry.ministry_name,
            portfolio.portfolio_abbrev,
            historical_projects.project_number,
            historical_projects.project_name,
            historical_projects.project_type,
            historical_projects.description,
            historical_projects.start_date,
            historical_projects.end_date,
            historical_projects.total_project_budget,
            NULL::text AS client_sponsor,
            historical_projects.project_manager,
            portfolio.id AS portfolio_id,
            historical_projects.ministry_id,
            ministry.ministry_short_name,
            portfolio.portfolio_name,
            fiscal_year.fiscal_year,
            fiscal_year.id AS fiscal_year_id
           FROM data.fiscal_year fiscal_year
             JOIN (data.ministry ministry
             JOIN (data.portfolio portfolio
             JOIN data.historical_projects historical_projects ON historical_projects.portfolio_id = portfolio.id) ON ministry.id = historical_projects.ministry_id) ON fiscal_year.id = historical_projects.fiscal_year) projectbyministry
  ORDER BY projectbyministry.ministry_name NULLS FIRST, projectbyministry.project_number NULLS FIRST;`;

exports.up = function (knex) {
  return knex.raw(projects_by_ministry);
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW projects_by_ministry;`);
};
