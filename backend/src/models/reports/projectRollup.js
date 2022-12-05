const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

// Relevant database tables
const projectTable = `${dataBaseSchemas().data}.project`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const projectStatusTable = `${dataBaseSchemas().data}.project_status`;
const projectPhaseTable = `${dataBaseSchemas().data}.project_phase`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const healthTable = `${dataBaseSchemas().data}.health_indicator`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */
 const getRollupByPortfolios = (portfolios) => {
    const query = knex(`${projectTable} as p`)
      .select(
        "p.portfolio_id",
        "p.project_number",
        "p.project_name",
        { project_manager: knex.raw("c.last_name || ', ' || c.first_name") },
        { start_date: knex.raw("COALESCE(p.agreement_start_date, p.planned_start_date)") },
        { end_date: knex.raw("COALESCE(p.agreement_end_date, p.planned_end_date)") },
        "status.status_date",
        { phase: "pp.phase_name" },        
        { project_health: "health.health_name" },
        { issues_and_decisions: "status.issues_and_decisions" },
        { forecast_and_next_steps: "status.forecast_and_next_steps" }
      )
      .join(`${fiscalYearTable} as fy`, "p.fiscal", "fy.id")
      .join(`${portfolioTable} as po`, "p.portfolio_id", "po.id")
      .join(`${contactTable} as c`, "p.project_manager", "c.id")
      .leftJoin(
        knex(projectStatusTable).select("*").distinctOn("project_id").as("status"),
        "p.id",
        "status.project_id"
      )
      .leftJoin(`${projectPhaseTable} as pp`, "status.project_phase_id", "pp.id")
      .leftJoin(`${healthTable} as health`, "status.health_id", "health.id")
      .leftJoin(`${healthTable} as schedule`, "status.schedule_health_id", "schedule.id")
      .leftJoin(`${healthTable} as budget`, "status.budget_health_id", "budget.id")
      .leftJoin(`${healthTable} as team`, "status.team_health_id", "team.id")
      .where("fy.is_current", 1)
      .orderBy([
        { column: "po.portfolio_name", order: "asc" },
        { column: "p.project_number", order: "desc" },
      ]);
    if (undefined !== portfolios) {
      if (!(portfolios instanceof Array)) {
        portfolios = [portfolios];
      }
      query.whereIn("p.portfolio_id", portfolios);
    }
    return query;
  };

  module.exports = {
    getRollupByPortfolios,
  };
  