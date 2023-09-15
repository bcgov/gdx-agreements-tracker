const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
// This is here for backwards compatibility
const {
  projectMilestoneTable,
  projectTable,
  portfolioTable,
  healthIndicatorTable,
  projectStatusTable,
  projectPhaseTable,
  contactTable,
  healthTable,
  fiscalYearTable,
} = require("@models/useDbTables");

// Get a specific report by project id.
const findById = (projectId) => {
  return knex
    .distinct()
    .select(
      "subquery.id",
      "project.id as ProjectID",
      knex.raw(
        `(CASE WHEN subquery.id IsNull THEN 'No Milestones' ELSE subquery.description END) AS Description`
      ),
      "subquery.target_completion_date",
      "subquery.status",
      "subquery.actual_completion_date",
      "subquery.colour_red",
      "subquery.colour_green",
      "subquery.colour_blue"
    )
    .from(projectTable)
    .leftJoin(
      () => {
        knex
          .select(
            "project_milestone.*",
            "health_indicator.colour_red",
            "health_indicator.colour_green",
            "health_indicator.colour_blue"
          )
          .from(projectMilestoneTable)
          .rightJoin(healthIndicatorTable, { "health_indicator.id": "project_milestone.health_id" })
          .as("subquery");
      },
      { "project.id": "subquery.project_id" }
    )
    .where({ "project.id": projectId });
};

/*
Individual Project Reports - Project Budget Summary
Purpose: Provide up to date information on any particular Project, can be used to provide client with information on their project budget.
Description: Run by project number shows deliverable amounts, their budgets, amounts recovered to date, balance remaining. Shows breakdown across fiscals, any change requests, any contracts associated with the project and amounts invoiced/remaining on the contracts.
*/

const projectBudgetReport = () => {
  return knex.raw(
    `SELECT DISTINCT *
    FROM (
        SELECT
        data.project.id AS projectId, -- project
        cr.Version,
        cr.initiation_date,
        cr.initiated_by,
        cr.Summary  --cr
        FROM data.project
        LEFT JOIN data.change_request as cr
        ON data.project.id = cr.link_id
        LEFT JOIN data.change_request_crtype as crc
        ON cr.id = crc.change_request_id
        LEFT JOIN data.crtype as crtype
        ON crtype.id = crc.crtype_id
        WHERE crc.change_request_id = cr.id
        GROUP BY projectId, cr.id
    )  AS rpt_P_BudgetSummary`
  );
};

/*
Individual Project Reports - Project Quarterly Review
Purpose: To outline how a project budget is broken down between quarters and the distribution of the recoveries over portfolios. Designed as a guide to review with PM each quarter and confirm billing amounts. Shows cross-fiscal amounts and breakdown between multiple clients as well.
Description: Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter, portfolio recovery amount.
*/

const projectQuarterlyReport = () => {
  return knex.raw(
    `
    SELECT
    proj.project_number,
    proj.project_name,
    proj.project_manager,
    proj.agreement_start_date,
    proj.agreement_end_date,
    pb.project_deliverable_id,
    pd.deliverable_name,
    pb.id,
    pb.q1_amount,
    pb.q1_recovered,
    pb.q2_amount,
    pb.q2_recovered,
    pb.q3_amount,
    pb.q3_recovered,
    pb.q4_amount,
    pb.q4_recovered,
    pb.notes,
    pb.detail_amount,
    pb.recovery_area,
    pb.resource_type,
    pb.stob,
    pd.deliverable_amount,
    pd.project_id,
    port.portfolio_abbrev,
    port.expense_authority,
    port.responsibility,
    port.service_line,
    pb.fiscal,
    fy.fiscal_year,
    pb.client_coding_id,
    cont.last_name,
    cont.first_name,
    pd.recoverable_amount,
    pb.contract_id
    FROM data.project AS proj
    INNER JOIN data.project_deliverable AS pd ON proj.id = pd.project_id
    INNER JOIN data.portfolio AS port ON proj.portfolio_id = port.id
    RIGHT JOIN data.project_budget AS pb ON port.id = pb.recovery_area
    INNER JOIN data.fiscal_year AS fy ON pb.fiscal = fy.id
    LEFT JOIN data.client_coding AS cc ON pb.client_coding_id = cc.id
    LEFT JOIN data.contact AS cont ON cc.contact_id = cont.id
    WHERE pb.contract_id IS NOT NULL;`
  );
};

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */
const getDashboardByPortfolios = (portfolios) => {
  const query = knex(`${projectTable} as p`)
    .select(
      "p.portfolio_id",
      "po.portfolio_name",
      "p.project_number",
      "p.project_name",
      { project_manager: knex.raw("c.last_name || ', ' || c.first_name") },
      { start_date: knex.raw("COALESCE(p.agreement_start_date, p.planned_start_date)") },
      { end_date: knex.raw("COALESCE(p.agreement_end_date, p.planned_end_date)") },
      "status.status_date",
      { phase: "pp.phase_name" },
      { schedule_health: "schedule.health_name" },
      { budget_health: "budget.health_name" },
      { team_health: "team.health_name" },
      { project_health: "health.health_name" }
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
    .where(() => {
      knex.where("fy.is_current", 1).orWhere("p.project_status", "Active");
    })
    .whereNot("pp.phase_name", "Archive")
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

/**
 * Gets the data for a Divisional Active Projects Report
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */
const getActiveProjects = (portfolios) => {
  const results = knex(`data.portfolio as portfolio`)
    .select({
      project_number: "project.project_number",
      project_name: "project.project_name",
      project_manager: knex.raw("contact.last_name || ', ' || contact.first_name"),
      description: "project.description",
      project_type: "project.project_type",
      start_date: "project.initiation_date",
      end_date: "project.planned_end_date",
      planned_budget: "project.planned_budget",
      client_ministry: "ministry_short_name",
    })
    .where("project.project_status", "Active")
    .leftJoin("data.project as project", { "portfolio.id": "project.portfolio_id" })
    .leftJoin("data.contact as contact", { "contact.id": "project.project_manager" })
    .leftJoin("data.ministry as ministry", { "ministry.id": "project.ministry_id" });
  if (undefined !== portfolios) {
    if (!(portfolios instanceof Array)) {
      portfolios = [portfolios];
    }
    results.whereIn("project.portfolio_id", portfolios);
  }
  return results;
};

/**
 * Gets the data for a Divisional Active Projects Report
 *
 * @param   {number}   fiscalYear   Fiscal year id to limit report to.
 * @param   {number}   projectId    Optional project id to limit report to. If empty, returns data for all projects.
 * @param   {number[]} portfolioIds Optional array of portfolio ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */
const getLessonsLearnedReport = (fiscalYear, projectId, portfolioIds) => {
  const results = knex("data.project as p")
    .select({
      lesson_category_id: "pl.lesson_category_id",
      lesson_category: "lc.lesson_category_name",
      project_number: "p.project_number",
      project_name: "p.project_name",
      portfolio: "po.portfolio_abbrev",
      lesson_sub_category: "pl.lesson_sub_category",
      lesson: "pl.lesson",
      recommendations: "pl.recommendations",
    })
    .join("data.project_lesson as pl", "p.id", "pl.project_id")
    .join("data.lesson_category as lc", "pl.lesson_category_id", "lc.id")
    .join("data.portfolio as po", "p.portfolio_id", "po.id")
    .where("p.fiscal", fiscalYear)
    .orderBy([
      { column: "lc.lesson_category_name", order: "asc" },
      { column: "p.project_number", order: "asc" },
    ]);
  if (undefined !== projectId) {
    results.where("p.id", projectId);
  }
  if (undefined !== portfolioIds) {
    if (!(portfolioIds instanceof Array)) {
      portfolioIds = [portfolioIds];
    }
    results.whereIn("p.portfolio_id", portfolioIds);
  }
  return results;
};

module.exports = {
  findById,
  projectBudgetReport,
  projectQuarterlyReport,
  getDashboardByPortfolios,
  getActiveProjects,
  getLessonsLearnedReport,
};
