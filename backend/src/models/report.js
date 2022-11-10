const dbConnection = require("../database/databaseConnection");
const { dateFormat } = require("../helpers/standards");
const { knex, dataBaseSchemas } = dbConnection();

// Relevant database tables
const projectMilestoneTable = `${dataBaseSchemas().data}.project_milestone`;
const projectTable = `${dataBaseSchemas().data}.project`;
const getFromView = `${dataBaseSchemas().data}.projects_with_json`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const healthIndicatorTable = `${dataBaseSchemas().data}.health_indicator`;
const projectStrategicAlignmentTable = `${dataBaseSchemas().data}.project_strategic_alignment`;
const strategicAlignmentTable = `${dataBaseSchemas().data}.strategic_alignment`;
const projectStatusTable = `${dataBaseSchemas().data}.project_status`;
const projectPhaseTable = `${dataBaseSchemas().data}.project_phase`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const healthTable = `${dataBaseSchemas().data}.health_indicator`;
const lessonsLearnedTable = `${dataBaseSchemas().data}.project_lesson`;
const contactProjectTable = `${dataBaseSchemas().data}.contact_project`;

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

// Get the project information for a specific project by id.
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

// Get the milestones for a specific project by id.
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

// Get the strategic alignment for a specific project by id.
const getStrategicAlignment = (projectId) => {
  return knex(projectStrategicAlignmentTable)
    .select("strategic_alignment.description")
    .leftJoin(strategicAlignmentTable, { strategic_alignment_id: "strategic_alignment.id" })
    .where({ project_id: projectId })
    .andWhere({ checked: true });
};

// Get the lessons learned for a specific project by id.
const getLessonsLearned = (projectId) => {
  return knex(lessonsLearnedTable).select("*").where("project_id", projectId);
};

/* 
Individual Project Reports - Project Status (Most Recent) 
Purpose: Shows the most recent status report on a  specific project
Description: Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status, milestone status.
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
Individual Project Reports - Project Status Summary 
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

module.exports = {
  findById,
  getMilestones,
  getStrategicAlignment,
  projectStatusReport,
  getProjectById,
  projectBudgetReport,
  projectQuarterlyReport,
  getProjectStatuses,
  getLessonsLearned,
};
