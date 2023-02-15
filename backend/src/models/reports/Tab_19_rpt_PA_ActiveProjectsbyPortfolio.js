const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */
const Tab_19_rpt_PA_ActiveProjectsbyPortfolio = (portfolios) => {
  const active_projects = knex.raw(`
    SELECT project.portfolio_id,
        project.planned_budget,
        portfolio.portfolio_name AS portfolio,
        project.project_number,
        c.last_name || ', ' || c.first_name project_manager,
        project.planned_start_date,
        project.planned_end_date,
        ministry.ministry_short_name AS client_ministry
        FROM (
            data.portfolio
            RIGHT JOIN data.project ON portfolio.id = project.portfolio_id
            LEFT JOIN data.contact as c ON project.project_manager = c.id
        )
        INNER JOIN data.ministry ON project.ministry_id = ministry.id
    WHERE(((project.project_status) = 'Active'))
    ORDER BY portfolio_id,
        project.project_number desc;
  `);
  if (undefined !== portfolios) {
    if (!(portfolios instanceof Array)) {
      portfolios = [portfolios];
    }
    active_projects.whereIn("project.portfolio_id", portfolios);
  }

  return active_projects;
};
const Tab_19_rpt_PA_ActiveProjectsbyPortfolio_budget_totals = (portfolios) => {
  const planned_budget_totals = knex.raw(`
    SELECT portfolio.id as portfolio_id,
        (SUM(project.planned_budget)) as TOTAL_BUDGET
    FROM (
            data.project
            LEFT JOIN data.portfolio ON portfolio.id = project.portfolio_id
        )
    WHERE(project.project_status = 'Active')
    GROUP BY portfolio.id;
  `);
  if (undefined !== portfolios) {
    if (!(portfolios instanceof Array)) {
      portfolios = [portfolios];
    }
    planned_budget_totals.whereIn("portfolio_id", portfolios);
  }
  return planned_budget_totals;
};

module.exports = {
  Tab_19_rpt_PA_ActiveProjectsbyPortfolio,
  Tab_19_rpt_PA_ActiveProjectsbyPortfolio_budget_totals,
};
