const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const _ = require("lodash");

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */
module.exports = (portfolios) => {
  const query = knex.select(
    knex.raw(`* from (
        SELECT p.project_number,
        p.project_name,
        c.first_name || ' ' || c.last_name AS project_manager,
        COALESCE( p.agreement_start_date, p.planned_start_date ) AS start_date,
        COALESCE( p.agreement_end_date, p.planned_end_date ) AS end_date,
        ps.status_date,
        pp.phase_name AS phase,
        COALESCE(budget.health_name, 'NULL') AS budget,
        COALESCE(schedule.health_name, 'NULL') AS schedule,
        COALESCE(team.health_name, 'NULL') AS team,
        COALESCE(health.health_name, 'NULL') AS health,
        ps.issues_and_decisions,
        ps.forecast_and_next_steps,
        po.portfolio_name,
        po.id as portfolio_id,
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
        WHERE  (fy.is_current = true OR p.project_status = 'Active') 
        ) as q`)
  );
  query.where({ r: 1 });
  query.orderBy([{ column: "portfolio_name" }, { column: "project_number", order: "desc" }]);

  // filter by the portfolio list passed in from the frontend(if valid)
  if (undefined !== portfolios) {
    query.whereIn("q.portfolio_id", _.castArray(portfolios));
  }

  return query;
};
