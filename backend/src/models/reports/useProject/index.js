/**
 * This is for global project models, which are used by multiple controllers.
 */
const dbConnection = require("@database/databaseConnection");
const { dateFormat } = require("../../../helpers/standards");
const { knex } = dbConnection();
const {
  contactTable,
  contactProjectTable,
  getFromView,
  healthIndicatorTable,
  healthTable,
  lessonsLearnedTable,
  projectTable,
  projectDeliverableTable,
  projectMilestoneTable,
  projectPhaseTable,
  projectStatusTable,
  projectStrategicAlignmentTable,
  strategicAlignmentTable,
} = require("@models/useDbTables");

/**
 * Get the project information for a specific project by id.
 *
 * @param   {int}   projectId The project id for the single project.
 * @returns {any[]}
 */
const getProjectById = (projectId) => {
  return knex(`${getFromView} as p`)
    .select(
      "p.*",
      { project_manager: knex.raw("mc.last_name || ', ' || mc.first_name") },
      { completed_by: knex.raw("clc.last_name || ', ' || clc.first_name") },
      {
        client_executive: "client_exec.name",
      },
      {
        gdx_executive: "gdx_exec.name",
      }
    )
    .leftJoin(`${contactTable} as mc`, "p.project_manager", "mc.id")
    .leftJoin(`${contactTable} as clc`, "p.completed_by_contact_id", "clc.id")
    .leftJoin(
      knex(`${contactProjectTable} as cp`)
        .first("cp.project_id", { name: knex.raw("c.last_name || ', ' || c.first_name") })
        .join(`${contactTable} as c`, "cp.contact_id", "c.id")
        // Client Sponsor role id is 1.
        .where("cp.contact_role", 1)
        .andWhere("cp.project_id", projectId)
        .as("client_exec"),
      { "p.id": "client_exec.project_id" }
    )
    .leftJoin(
      knex(`${contactProjectTable} as cp`)
        .first("cp.project_id", { name: knex.raw("c.last_name || ', ' || c.first_name") })
        .join(`${contactTable} as c`, "cp.contact_id", "c.id")
        // GDX Sponsor role id is 4.
        .where("cp.contact_role", 4)
        .andWhere("cp.project_id", projectId)
        .as("gdx_exec"),
      { "p.id": "gdx_exec.project_id" }
    )
    .where("p.id", projectId)
    .first();
};

/**
 * Individual Project Reports - Project Status (Most Recent).
 * Purpose: Shows the most recent status report on a  specific project.
 * Description: Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status, milestone status.
 *
 * @param   {int}   projectId The project id
 * @returns {any[]}
 */
const projectStatusReport = (projectId) => {
  return knex(`${projectTable} as p`)
    .distinct()
    .columns(
      { project_id: "p.id" },
      {
        deliverable_name: knex.raw(
          `(CASE WHEN pd.id is null then 'No Deliverables' ELSE pd.deliverable_name END)`
        ),
      },
      { start_date: knex.raw(`TO_CHAR(pd.start_date :: DATE, '${dateFormat}')`) },
      { completion_date: knex.raw(`TO_CHAR(pd.completion_date :: DATE, '${dateFormat}')`) },
      { amount: "pd.deliverable_amount" },
      { percent_complete: knex.raw("??*100", ["pd.percent_complete"]) },
      "hi.colour_red",
      "hi.colour_green",
      "hi.colour_blue",
      "pd.deliverable_status",
      "pd.health_id"
    )
    .leftJoin(`${projectDeliverableTable} as pd`, { "p.id": "pd.project_id" })
    .rightJoin(`${healthIndicatorTable} as hi`, { "hi.id": "pd.health_id" })
    .where((builder) => {
      builder.whereNull("pd.is_expense").orWhere("pd.is_expense", "False");
    })
    .andWhere({ "p.id": projectId });
};

/**
 * Get the milestones for a specific project by id.
 *
 * @param   {int}   projectId The project id.
 * @returns {any[]}
 */
const getMilestones = (projectId) => {
  return knex(projectMilestoneTable)
    .select(
      "project_id",
      "description",
      "fiscal_id",
      {
        target_completion_date: knex.raw(
          `TO_CHAR(target_completion_date :: DATE, '${dateFormat}')`
        ),
      },
      {
        actual_completion_date: knex.raw(
          `TO_CHAR(actual_completion_date :: DATE, '${dateFormat}')`
        ),
      },
      "status",
      "health_id"
    )
    .where({ project_id: projectId });
};

/**
 * Get the strategic alignment for a specific project by id.
 *
 * @param   {int}   projectId The project id.
 * @returns {any[]}
 */
const getStrategicAlignment = (projectId) => {
  return knex(projectStrategicAlignmentTable)
    .select("strategic_alignment.description")
    .leftJoin(strategicAlignmentTable, { strategic_alignment_id: "strategic_alignment.id" })
    .where({ project_id: projectId })
    .andWhere({ checked: true });
};

/**
 * Individual Project Reports - Project Status Summary
 *
 * @param   {int}   projectId The project id.
 * @returns {any[]}
 */
const getProjectStatuses = (projectId) => {
  return knex(`${projectStatusTable} as ps`)
    .select(
      "ps.*",
      { reported_by: knex.raw("c.last_name || ', ' || c.first_name") },
      { phase: "pp.phase_name" },
      {
        project_health: "health.health_name",
      },
      {
        schedule_health: "schedule.health_name",
      },
      {
        budget_health: "budget.health_name",
      },
      {
        team_health: "team.health_name",
      }
    )
    .join(`${contactTable} as c`, "ps.reported_by_contact_id", "c.id")
    .join(`${projectPhaseTable} as pp`, "ps.project_phase_id", "pp.id")
    .leftJoin(`${healthTable} as health`, "ps.health_id", "health.id")
    .leftJoin(`${healthTable} as schedule`, "ps.schedule_health_id", "schedule.id")
    .leftJoin(`${healthTable} as budget`, "ps.budget_health_id", "budget.id")
    .leftJoin(`${healthTable} as team`, "ps.team_health_id", "team.id")
    .where("ps.project_id", projectId)
    .orderBy("ps.id", "DESC");
};

/**
 * Get the lessons learned for a specific project by id.
 *
 * @param   {int}   projectId The Project Id
 * @returns {any[]}
 */
const getLessonsLearned = (projectId) => {
  return knex(lessonsLearnedTable).select("*").where("project_id", projectId);
};

module.exports = {
  getProjectById,
  projectStatusReport,
  getMilestones,
  getStrategicAlignment,
  getProjectStatuses,
  getLessonsLearned,
};
