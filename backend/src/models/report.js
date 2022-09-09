const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

// Relevant database tables
const projectMilestoneTable = `${dataBaseSchemas().data}.project_milestone`;
const projectTable = `${dataBaseSchemas().data}.project`;
const healthIndicatorTable = `${dataBaseSchemas().data}.health_indicator`;

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
        this.select(
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
Individual Project Reports - Project Status (Most Recent) 
Purpose: Shows the most recent status report on a  specific project
Description: Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status, milestone status.
*/

const projectStatusReport = () => {
  return knex.raw(
    `SELECT DISTINCT *
    FROM (
        SELECT 
        data.project_deliverable.id, 
        data.project.id  AS project_id, 
        (CASE 
        WHEN data.project_deliverable.id is null then 'No Deliverables' 
        ELSE data.project_deliverable.deliverable_name
      END) as deliverable_name, 
        data.project_deliverable.start_date, 
        data.project_deliverable.completion_date, 
        data.project_deliverable.deliverable_amount, 
        data.project_deliverable.percent_complete, 
        data.health_indicator.colour_red, 
        data.health_indicator.colour_green, 
        data.health_indicator.colour_blue, 
        data.project_deliverable.deliverable_status 
        FROM data.project 
        LEFT JOIN (
            data.health_indicator 
            RIGHT JOIN data.project_deliverable 
            ON data.health_indicator.id = data.project_deliverable.health_id
        ) 
        ON data.project.id  = data.project_deliverable.project_id 
        WHERE (((data.project_deliverable.is_expense)=False Or (data.project_deliverable.is_expense) Is Null))
    )  AS rpt_P_StatusSummary`
  );
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

module.exports = {
  findById,
  projectStatusReport,
  projectBudgetReport,
  projectQuarterlyReport,
};
