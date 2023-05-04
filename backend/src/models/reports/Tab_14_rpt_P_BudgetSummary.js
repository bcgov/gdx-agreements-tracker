const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { dateFormat } = require("../../helpers/standards");
const { findById, findMostRecentStatusById } = require("@models/projects");
const {
  projectBudgetTable,
  projectDeliverableTable,
  contractTable,
  fiscalYearTable,
  changeRequestTable,
  changeRequestTypeLookupTable,
  changeRequestTypeTable,
  supplierTable,
} = require("@models/useDbTables");

/**
 * Get the project budget for a specific project by id.
 *
 * @param   {int}   projectId The Project Id for the specific project.
 * @returns {any[]}
 */
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

/* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
/**
 * Get the deliverable totals per fiscal year for a specific project by id.
 * The projectId is cast to a number in the controller.
 *
 * @param   {int}   projectId The Project Id for the specific project.
 * @returns {any[]}
 */
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
    FROM ${projectBudgetTable} AS pb
    
    LEFT JOIN ${projectDeliverableTable} AS pd ON pb.project_deliverable_id = pd.id
    WHERE pd.project_id = ${projectId}
    GROUP BY pd.fiscal) as q1
    INNER JOIN
    (SELECT
     fiscal,
    SUM(deliverable_amount) AS current_budget,
    SUM(recoverable_amount) AS recovery_amount
    FROM ${projectDeliverableTable}
    WHERE project_id = ${projectId}
    GROUP BY fiscal) AS q2
    ON q2.fiscal = q1.fiscal
    LEFT JOIN ${fiscalYearTable} AS fy ON fy.id = q1.fiscal`
  );
};

/**
 * Get the change requests for a specific project by id
 *
 * @param   {int}   projectId The Project Id for the specific project.
 * @returns {any[]}
 */
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

/**
 * Get the contracts for a specific project by id.
 *
 * @param   {int}   projectId The Project Id for the specific project.
 * @returns {any[]}
 */
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

/**
 * Get the contract totals per fiscal year for a specific project by id.
 *
 * @param   {int}   projectId The Project Id for the specific project.
 * @returns {any[]}
 */
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

module.exports = {
  findById,
  findMostRecentStatusById,
  getProjectBudget,
  getDeliverableSummaries,
  getChangeRequests,
  getContracts,
  getContractSummary,
};
