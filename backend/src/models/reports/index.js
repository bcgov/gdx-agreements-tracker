const dbConnection = require("@database/databaseConnection");
const { dateFormat } = require("../../helpers/standards");
const { knex, dataBaseSchemas } = dbConnection();

// Relevant database tables
const projectMilestoneTable = `${dataBaseSchemas().data}.project_milestone`;
const projectTable = `${dataBaseSchemas().data}.project`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const getFromView = `${dataBaseSchemas().data}.projects_with_json`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const healthIndicatorTable = `${dataBaseSchemas().data}.health_indicator`;
const projectStrategicAlignmentTable = `${dataBaseSchemas().data}.project_strategic_alignment`;
const strategicAlignmentTable = `${dataBaseSchemas().data}.strategic_alignment`;
const projectStatusTable = `${dataBaseSchemas().data}.project_status`;
const projectPhaseTable = `${dataBaseSchemas().data}.project_phase`;
const projectBudgetTable = `${dataBaseSchemas().data}.project_budget`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const healthTable = `${dataBaseSchemas().data}.health_indicator`;
const lessonsLearnedTable = `${dataBaseSchemas().data}.project_lesson`;
const contactProjectTable = `${dataBaseSchemas().data}.contact_project`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const changeRequestTable = `${dataBaseSchemas().data}.change_request`;
const changeRequestTypeLookupTable = `${dataBaseSchemas().data}.change_request_crtype`;
const changeRequestTypeTable = `${dataBaseSchemas().data}.crtype`;
const contractTable = `${dataBaseSchemas().data}.contract`;
const supplierTable = `${dataBaseSchemas().data}.supplier`;

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

// Get the project budget for a specific project by id
const getProjectBudget = (projectId) => {
  return knex(`${projectBudgetTable} as pb`)
    .select({
      fiscal: `fy.fiscal_year`,
      deliverable_name: `pd.deliverable_name`,
      deliverable_amount: `pd.deliverable_amount`,
      recoverable: `pd.recoverable_amount`,
      recovered_to_date: knex.raw(
        `SUM(pb.q1_amount) + SUM(pb.q2_amount) + SUM(pb.q3_amount) + SUM(pb.q4_amount)`
      ),
      remaining: knex.raw(
        `pd.recoverable_amount - (SUM(pb.q1_amount) + SUM(pb.q2_amount) + SUM(pb.q3_amount) + SUM(pb.q4_amount))`
      ),
    })
    .rightJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .leftJoin(`${fiscalYearTable} as fy`, { "pd.fiscal": "fy.id" })
    .where({ "pd.project_id": projectId })
    .groupBy(
      `fy.fiscal_year`,
      `pd.deliverable_name`,
      `pd.recoverable_amount`,
      `pd.deliverable_amount`
    )
    .orderBy(`fy.fiscal_year`);
};

// Get the change requests for a specific project by id
const getChangeRequests = (projectId) => {
  return knex(`${changeRequestTable} as cr`)
    .select({
      version: "cr.version",
      initiated_by: "cr.initiated_by",
      initiation_date: knex.raw(`TO_CHAR(cr.initiation_date :: DATE, '${dateFormat}')`),
      summary: "cr.summary",
      type: knex.raw(`string_agg(crt.crtype_name, ', ')`),
    })
    .leftJoin(`${changeRequestTypeLookupTable} as crtl`, { "crtl.change_request_id": "cr.id" })
    .leftJoin(`${changeRequestTypeTable} as crt`, { "crtl.crtype_id": "crt.id" })
    .groupBy("cr.id")
    .where({ "cr.link_id": projectId })
    .orderBy("cr.version");
};

// Get the contracts for a specific project by id
const getContracts = (projectId) => {
  return knex(`${contractTable} as ct`)
    .select("*", {
      supplier: "st.supplier_name",
      end_date: knex.raw(`TO_CHAR(ct.end_date :: DATE, '${dateFormat}')`),
      fiscal: "fy.fiscal_year",
      contract_amount: knex.raw("ct.total_fee_amount + ct.total_expense_amount"),
    })
    .leftJoin(`${supplierTable} as st`, { "st.id": "ct.supplier_id" })
    .leftJoin(`${fiscalYearTable} as fy`, { "fy.id": "ct.fiscal" })
    .where({ "ct.project_id": projectId })
    .orderBy("ct.co_number");
};
/* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
// todo: replace this raw query with a knex version. See feature/knex-budget-summary
// Get the deliverable totals per fiscal year for a specific project by id
const getDeliverableSummaries = (projectId) => {
  return knex.raw(
    `SELECT
    fiscal_year,
    current_budget,
    recovery_amount,
    recovered_td,
    current_budget - recovered_td AS balance_remaining
    FROM 
    (SELECT
    pd.fiscal,
    SUM(q1_amount + q2_amount + q3_amount + q4_amount) AS recovered_td --good
    FROM data.project_budget AS pb
    
    LEFT JOIN data.project_deliverable AS pd ON pb.project_deliverable_id = pd.id
    WHERE pd.project_id = ${projectId}
    GROUP BY pd.fiscal) as q1
    INNER JOIN
    (SELECT
     fiscal,
    SUM(deliverable_amount) AS current_budget,
    SUM(recoverable_amount) AS recovery_amount
    FROM data.project_deliverable
    WHERE project_id = ${projectId}
    GROUP BY fiscal) AS q2
    ON q2.fiscal = q1.fiscal
    LEFT JOIN data.fiscal_year AS fy ON fy.id = q1.fiscal`
  );
};

// Get the contract totals per fiscal year for a specific project by id
const getContractSummary = (projectId) => {
  return knex(`${contractTable} as ct`)
    .select({
      fiscal: "fy.fiscal_year",
      total_contract_amount: knex.raw("SUM(ct.total_fee_amount) + SUM(ct.total_expense_amount)"),
      total_fee_amount: knex.sum("ct.total_fee_amount"),
      total_expense_amount: knex.sum("ct.total_expense_amount"),
    })
    .leftJoin(`${fiscalYearTable} as fy`, { "fy.id": "ct.fiscal" })
    .groupBy("fy.fiscal_year")
    .where({ "ct.project_id": projectId });
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

// Get array of deliverables with summed budget amounts.
const getDeliverableBudgets = (projectId, fiscal, quarter) => {
  return knex(`${projectBudgetTable} as pb`)
    .select("pd.deliverable_name", {
      amount: knex.raw(`SUM(pb.q${quarter}_amount::numeric::float8)`),
    })
    .join(`${projectDeliverableTable} as pd`, "pb.project_deliverable_id", "pd.id")
    .where("pd.project_id", projectId)
    .andWhere("pb.fiscal", fiscal)
    .groupBy("pd.id")
    .orderBy("pd.deliverable_name", "ASC")
    .having(knex.raw(`SUM(pb.q${quarter}_amount::numeric::float8)`), ">", 0);
};

// Get project's client coding data.
const getClientCoding = (projectId) => {
  return knex(`data.client_coding as cc`)
    .select("cc.*", "c.*", { client_name: knex.raw("c.last_name || ', ' || c.first_name") })
    .join(`${contactTable} as c`, "cc.contact_id", "c.id")
    .where("cc.project_id", projectId)
    .first();
};

// Get project's journal voucher data.
const getJournalVoucher = (projectId, fiscal, quarter) => {
  return knex(`data.jv`)
    .select("*")
    .where("project_id", projectId)
    .andWhere("fiscal_year_id", fiscal)
    .andWhere("quarter", quarter)
    .first();
};

// Get the quarterly fiscal summary for a specific project by id
const getQuarterlyFiscalSummaries = (projectId) => {
  // Client specific summaries grouped by fiscal year
  return knex("data.fiscal_year as fy")
    .select({
      fiscal_year: "fiscal_year",
      detail_total: knex.sum("detail_amount"),
      q1_total: knex.sum("q1_amount"),
      q2_total: knex.sum("q2_amount"),
      q3_total: knex.sum("q3_amount"),
      q4_total: knex.sum("q4_amount"),
      client: "pb.client_coding_id",
    })
    .leftJoin("data.project_deliverable as pd", { "fy.id": "pd.fiscal" })
    .leftJoin("data.project_budget as pb", { "pd.id": "pb.project_deliverable_id" })
    .where("pd.project_id", projectId)
    .groupBy("fy.fiscal_year", "pb.client_coding_id")
    .orderBy("fy.fiscal_year", "pb.client_coding_id");
};

// Get the breakdown for deliverables for a specific project by id and fiscal_summary
const getQuarterlyDeliverables = (projectId, fiscal_summary) => {
  let data = [];
  for (let fiscal in fiscal_summary) {
    data.push(
      knex(`data.project_deliverable as pd`)
        .select({
          fiscal_year: "fy.fiscal_year",
          id: "pd.id",
          deliverable_name: "deliverable_name",
          detail_amount: "detail_amount",
          q1_amount: "q1_amount",
          q2_amount: "q2_amount",
          q3_amount: "q3_amount",
          q4_amount: "q4_amount",
          resource_type: "resource_type",
          porfolio_abbrev: "portfolio_abbrev",
          responsibility: "responsibility",
          service_line: "port.service_line",
          stob: "pb.stob",
          expense_authority_name: "expense_authority_name",
        })
        .leftJoin(`data.project_budget as pb`, { "pd.id": "pb.project_deliverable_id" })
        .leftJoin(`data.client_coding as cc`, { "cc.id": "pb.client_coding_id" })
        .leftJoin(`data.portfolio as port`, { "port.id": "pb.recovery_area" })
        .leftJoin(`data.fiscal_year as fy`, { "fy.id": "pd.fiscal" })
        .where({ "pd.project_id": projectId })
        .andWhere({ "fy.fiscal_year": fiscal_summary[fiscal].fiscal_year })
        // For client specific breakdown
        .andWhere({ "cc.id": fiscal_summary[fiscal].client })
        .orderBy("deliverable_name")
        // Construct the array of fiscal breakdown and summaries
        .then((results) => {
          return {
            fiscal_year: fiscal_summary[fiscal].fiscal_year,
            q1_client_total: fiscal_summary[fiscal].q1_total,
            q2_client_total: fiscal_summary[fiscal].q2_total,
            q3_client_total: fiscal_summary[fiscal].q3_total,
            q4_client_total: fiscal_summary[fiscal].q4_total,
            detail_client_total: fiscal_summary[fiscal].detail_total,
            details: results,
          };
        })
    );
  }
  return Promise.all(data);
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
      start_date: knex.raw(`TO_CHAR(project.initiation_date :: DATE, '${dateFormat}')`),
      end_date: knex.raw(`TO_CHAR(project.planned_end_date :: DATE, '${dateFormat}')`),
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

/**
 * Gets the data for a Contract Summary Report
 *
 * @param   {number} contractId Contract id to limit report to.
 * @returns {any}
 */
const getContractSummaryReport = (contractId) => {
  return knex("data.contract as contract")
    .select({
      contract: "contract.*",
      start_date: knex.raw(`TO_CHAR(contract.start_date :: DATE, '${dateFormat}')`),
      end_date: knex.raw(`TO_CHAR(contract.end_date :: DATE, '${dateFormat}')`),
      total_contract: knex.raw("contract.total_fee_amount + contract.total_expense_amount"),
      supplier_name: "supplier_name",
      internal_coding: "internal_coding.*",
      portfolio: "portfolio.*",
      portfolio_name: "portfolio.portfolio_name",
    })
    .leftJoin("data.supplier as supplier", { "supplier.id": "contract.supplier_id" })
    .leftJoin("data.sid_internal_coding as internal_coding", {
      "contract.id": "internal_coding.contract_id",
    })
    .leftJoin("data.portfolio as portfolio", { "portfolio.id": "internal_coding.portfolio_id" })
    .where("contract.id", contractId);
};

/**
 * Gets the contract invoices for a specific contract by id
 *
 * @param   {number} contractId Contract id to limit report to.
 * @returns {any[]}
 */
const getContractInvoices = (contractId) => {
  const results = knex("data.invoice as invoice")
    .select({
      fiscal: knex.min("fiscal_year"),
      billing_period: knex.min("billing_period"),
      invoice_date: knex.raw(`MIN(TO_CHAR(invoice_date:: DATE, '${dateFormat}'))`),
      invoice_number: "invoice_number",
      invoice_amount: knex.raw("SUM(unit_amount * rate)"),
    })
    .leftJoin("data.contract as contract", { "contract.id": "invoice.contract_id" })
    .leftJoin("data.fiscal_year as fiscal_year", { "fiscal_year.id": "invoice.fiscal" })
    .leftJoin("data.invoice_detail as invoice_detail", {
      "invoice.id": "invoice_detail.invoice_id",
    })
    .where("invoice.contract_id", contractId)
    .groupBy("invoice_number")
    .orderBy("invoice_number");
  return results;
};
/**
 * Gets the contract payment summary for a specific contract by id and fiscal year
 *
 * @param   {*}     contractId Contract id to limit report to.
 * @param   {*}     fiscalYear Fiscal year to summarize over
 * @returns {any[]}
 */
const getContractPaymentSummary = (contractId, fiscalYear) => {
  return knex("data.invoice_detail as detail")
    .select({
      fiscal: "fiscal_year",
      fees_invoiced: knex.raw("SUM(unit_amount * rate)"),
      rees_remaining: knex.raw("MIN(total_fee_amount) - SUM(unit_amount * rate)"),
    })
    .leftJoin("data.invoice as invoice", { "detail.invoice_id": "invoice.id" })
    .leftJoin("data.contract as contract", { "contract.id": "invoice.contract_id" })
    .leftJoin("data.fiscal_year as fiscal", { "fiscal.id": "invoice.fiscal" })
    .where({ "invoice.contract_id": contractId })
    .andWhere({ fiscal_year: fiscalYear })
    .groupBy("fiscal_year");
};

/**
 * Gets the contract amendments for a specific contract by id
 *
 * @param   {number} contractId Contract id to limit report to.
 * @returns {any[]}
 */
const getContractAmendments = (contractId) => {
  const results = knex("data.contract_amendment as contract_amendment")
    .select({
      amendment_number: "amendment_number",
      amendment_date: knex.raw(
        `TO_CHAR(contract_amendment.amendment_date :: DATE, '${dateFormat}')`
      ),
      amendment_type: knex.raw(`string_agg(amendment_type.amendment_type_name, ', ')`),
      description: "contract_amendment.description",
    })
    .leftJoin("data.contract_amendment_amendment_type as cat", {
      "contract_amendment.id": "cat.contract_amendment_id",
    })
    .leftJoin("data.amendment_type as amendment_type", {
      "amendment_type.id": "cat.amendment_type_id",
    })
    .where("contract_amendment.contract_id", contractId)
    .groupBy("contract_amendment.id")
    .orderBy("contract_amendment.amendment_date");
  return results;
};

module.exports = {
  findById,
  getMilestones,
  getStrategicAlignment,
  getProjectBudget,
  getChangeRequests,
  getContracts,
  getDeliverableSummaries,
  getContractSummary,
  getContractSummaryReport,
  getContractAmendments,
  projectStatusReport,
  getProjectById,
  projectBudgetReport,
  projectQuarterlyReport,
  getQuarterlyDeliverables,
  getProjectStatuses,
  getDeliverableBudgets,
  getClientCoding,
  getJournalVoucher,
  getLessonsLearned,
  getQuarterlyFiscalSummaries,
  getDashboardByPortfolios,
  getActiveProjects,
  getLessonsLearnedReport,
  getContractInvoices,
  getContractPaymentSummary,
};
