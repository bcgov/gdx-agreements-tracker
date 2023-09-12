const _ = require("lodash");
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { dateFormatShortYear } = require("@helpers/standards");

// filters query results to work around knex.raw()'s inability to chain methods
const portfolioFilter = (portfolios) =>
  _.isUndefined(portfolios)
    ? `WHERE(project.project_status IN ('Active'))`
    : `WHERE(project.project_status IN ('Active')) AND (project.portfolio_id IN (${_.castArray(
        portfolios
      ).join(",")}))`;

module.exports = {
  active_projects: (portfolios) => {
    /**
     * Gets data for the Divisional Project Reports - Project Dashboard report.
     *
     * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
     * @returns {any[]}
     */
    const active_projects = knex.raw(`
    SELECT project.portfolio_id,
      portfolio.portfolio_name AS portfolio_name,
      project.project_number,
      project.project_name,
      c.last_name || ', ' || c.first_name project_manager,
      project.description,
      project.project_type,
      project.planned_start_date,
      project.planned_end_date,
      TO_CHAR(project.planned_start_date :: DATE, '${dateFormatShortYear}') AS planned_start_date,
      TO_CHAR(project.planned_end_date :: DATE, '${dateFormatShortYear}') AS planned_end_date,
      project.planned_budget,
      ministry.ministry_short_name AS client_ministry
    FROM (
        data.portfolio
        RIGHT JOIN data.project ON portfolio.id = project.portfolio_id
        LEFT JOIN data.contact as c ON project.project_manager = c.id
    )
    INNER JOIN data.ministry ON project.ministry_id = ministry.id
    ${portfolioFilter(portfolios)}
    ORDER BY portfolio_name,
        project.project_number desc;
  `);

    return active_projects;
  },

  planned_budget_totals: (portfolios) =>
    knex.raw(`
      SELECT portfolio.id,
        (SUM(project.planned_budget)) as TOTAL_BUDGET,
        portfolio.portfolio_name
      FROM (
        data.project
        RIGHT JOIN data.portfolio ON portfolio.id = project.portfolio_id
      )
      WHERE(project.project_status = 'Active')
      GROUP BY portfolio.id
      ORDER BY portfolio.portfolio_name;
  `),

  report_total: (portfolios) =>
    knex.raw(`
      SELECT (SUM(project.planned_budget)) as report_total
      FROM data.project
      ${portfolioFilter(portfolios)}
  `),
};
