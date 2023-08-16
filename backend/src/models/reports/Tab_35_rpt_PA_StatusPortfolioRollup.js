const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const reportQueries = {
  report: (portfolio) =>
    knex.with(
      "q",
      knex.raw(
        `SELECT
          p.id AS project_id,
          po.portfolio_name,
          p.project_number,
          p.project_name,
          fy.fiscal_year,
          c.first_name || ' ' || c.last_name project_manager,
          COALESCE( p.agreement_start_date, p.planned_start_date ) start_date,
          COALESCE( p.agreement_end_date, p.planned_end_date ) end_date,
          ps.status_date,
          ps.id project_status_id,
          pp.phase_name,
          ps.issues_and_decisions,
          ps.forecast_and_next_steps,
          hi.health_name project_health,
          hi_sched.health_name schedule_health,
          hi_budg.health_name budget_health,
          hi_team.health_name team_health,
          m.ministry_name,
          p.portfolio_id,
          row_number() OVER( PARTITION BY p.ID ORDER BY ps.status_date desc, ps.ID desc ) r
        FROM project p
        INNER JOIN fiscal_year fy ON p.fiscal = fy.id
        INNER JOIN ministry m ON p.ministry_id = m.id
        LEFT JOIN contact c ON p.project_manager = c.id
        LEFT JOIN portfolio po ON p.portfolio_id = po.id
        LEFT JOIN project_status as ps ON p.ID = ps.project_id 
        LEFT JOIN project_phase as pp ON ps.project_phase_id = pp.id
        LEFT JOIN health_indicator as hi ON ps.health_id = hi.id
        LEFT JOIN health_indicator as hi_sched ON ps.schedule_health_id = hi_sched.id
        LEFT JOIN health_indicator as hi_budg ON ps.budget_health_id = hi_budg.id
        LEFT JOIN health_indicator as hi_team ON ps.team_health_id = hi_team.id
        WHERE
          fy.is_current <> false
          OR p.project_status = 'Active'`
      )
    )
    .select()
    .from("q")
    .modify((queryBuilder) => {
      if (portfolio) {
        queryBuilder.whereIn(
          "q.portfolio_id",
          // If portfolio is not an array, transform it into one so we can use the .whereIn() function.
          portfolio instanceof Array ? portfolio[0].split(",") : [portfolio]
        );
      }
    })
    .andWhere("q.r", 1)
    .andWhere("q.phase_name", "<>", "'Archive'")
};

module.exports = {
  required: [],
  getAll: async ({ portfolio }) => {
    const [report] = await Promise.all([reportQueries.report(portfolio)
    ]);
    
  return {report};
  }
};
