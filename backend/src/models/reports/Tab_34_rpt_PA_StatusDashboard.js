const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const _ = require("lodash");

// filter raw query results by the value of the portfolios argument.
const portfolioFilter = (portfolios) => {
  if (!portfolios) return `WHERE  fy.is_current = true OR p.project_status = 'Active'`;

  return `WHERE  fy.is_current = true 
    OR p.project_status = 'Active' 
    AND (p.portfolio_id IN (${_.castArray(portfolios).join(",")}))`;
};

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */
module.exports = (portfolios) =>
  knex.raw(`
    WITH
    q AS (
    SELECT p.id AS project_id,
    po.portfolio_name,
    p.project_number,
    p.project_name,
    fy.fiscal_year,
    c.first_name || ' ' || c.last_name AS project_manager,
    COALESCE( p.agreement_start_date, p.planned_start_date ) AS start_date,
    COALESCE( p.agreement_end_date, p.planned_end_date ) AS end_date,
    ps.status_date,
    ps.id AS project_status_id,
    pp.phase_name,
    ps.issues_and_decisions,
    ps.forecast_and_next_steps,
    health.health_name AS project_health,
    schedule.health_name AS schedule_health,
    budget.health_name AS budget_health,
    team.health_name AS team_health,
    m.ministry_name,
    p.portfolio_id,
    row_number() OVER ( PARTITION by p.id order by ps.status_date desc, ps.id desc ) AS r
    FROM data.project AS p
    INNER JOIN data.fiscal_year AS fy on p.fiscal = fy.id
    INNER JOIN data.ministry AS m on p.ministry_id = m.id
    LEFT JOIN data.contact AS c on p.project_manager = c.id
    LEFT JOIN data.portfolio AS po on p.portfolio_id = po.id
    LEFT JOIN data.project_status AS ps on p.id = ps.project_id
    LEFT JOIN data.project_phase AS pp on ps.project_phase_id = pp.id
    LEFT JOIN data.health_indicator AS health on ps.health_id = health.id
    LEFT JOIN data.health_indicator AS schedule on ps.schedule_health_id = schedule.id
    LEFT JOIN data.health_indicator AS budget on ps.budget_health_id = budget.id
    LEFT JOIN data.health_indicator AS team on ps.team_health_id = team.id
    ${portfolioFilter(portfolios)}
    )
    SELECT * FROM q WHERE r = 1 AND phase_name != 'archive'
    ORDER BY portfolio_name;
`);
