const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_35_rpt_PA_StatusPortfolioRollup = () => {
  console.log("made it!!!");
  const query = knex().raw(`with
  q as (
      select  p.id as project_id,
              po.portfolio_name,
           p.project_number,
              p.project_name,
              fy.fiscal_year,
              c.first_name || ' ' || c.last_name project_manager,
              coalesce( p.agreement_start_date, p.planned_start_date ) start_date,
          coalesce( p.agreement_end_date, p.planned_end_date ) end_date,
              ps.status_date,
              ps.status_date,
          ps.id project_status_id,
          pp.phase_name,
          ps.issues_and_decisions,
              ps.forecast_and_next_steps,
              hi.colour_red,
          hi.colour_green,
          hi.colour_blue,
              hi_sched.colour_red color_red_schedule,
        hi_sched.colour_green color_green_schedule,
        hi_sched.colour_blue color_blue_schedule,
        hi_budg.colour_red colour_red_budget,
        hi_budg.colour_green colour_green_budget,
        hi_budg.colour_blue colour_blue_budget,
        hi_team.colour_red colour_red_team,
        hi_team.colour_green colour_green_team,
        hi_team.colour_blue colour_blue_team,
        m.ministry_name,
            p.portfolio_id,
              row_number() over( partition by p.ID order by ps.status_date desc, ps.ID desc ) r
          from data.project p
              inner join data.fiscal_year fy on p.fiscal = fy.id
          inner join data.ministry m on p.ministry_id = m.id
              left join data.contact c on p.project_manager = c.id
          left join data.portfolio po on p.portfolio_id = po.id
        left join data.project_status as ps on p.ID = ps.project_id 
        left join data.project_phase as pp on ps.project_phase_id = pp.id
        left join data.health_indicator as hi on ps.health_id = hi.id
        left join data.health_indicator as hi_sched on ps.schedule_health_id = hi_sched.id
          left join data.health_indicator as hi_budg on ps.budget_health_id = hi_budg.id
          left join data.health_indicator as hi_team on ps.team_health_id = hi_team.id
      where   fy.is_current <> false
         or   p.project_status = 'Active'
  )
  select * from q where r = 1 and phase_name <> 'Archive'`);
console.log('query====================>', query)
  return query;
};

module.exports = {
  Tab_35_rpt_PA_StatusPortfolioRollup,
};
