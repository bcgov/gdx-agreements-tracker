const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const { dateFormat } = require("../../helpers/standards");
const projectBudgetTable = `${dataBaseSchemas().data}.project_budget`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const contractsTable = `${dataBaseSchemas().data}.contract`;
const recoveriesTable = `${dataBaseSchemas().data}.recovery_type`;

const findAllById = (projectId) => {
  return knex(`${projectBudgetTable} as prb`)
    .columns(
      "prb.id",
      "prb.q1_amount",
      "prb.q1_recovered",
      "prb.q2_amount",
      "prb.q2_recovered",
      "prb.q3_amount",
      "prb.q3_recovered",
      "prb.q4_amount",
      "prb.q4_recovered",
      "fy.fiscal_year as fiscal",
      "prb.notes",
      "prb.project_deliverable_id",
      "prb.detail_amount",
      "prb.recovery_area",
      "prb.resource_type",
      "prb.stob",
      "prb.client_coding_id",
      "prb.contract_id"
    )
    .leftJoin(`${fiscalYearTable} as fy`, { "prb.fiscal": `fy.id` })
    .leftJoin(`${projectDeliverableTable} as prd`, { "prb.project_deliverable_id": "prd.id" })
    .orderBy("prb.id")
    .where({ "prd.project_id": projectId });
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select(
      "prb.id",
      "prb.q1_amount",
      "prb.q1_recovered",
      "prb.q2_amount",
      "prb.q2_recovered",
      "prb.q3_amount",
      "prb.q3_recovered",
      "prb.q4_amount",
      "prb.q4_recovered",
      knex.raw(
        "(SELECT json_build_object('value', prb.fiscal, 'label', fy.fiscal_year)) AS fiscal"
      ),
      "prb.notes",  
      knex.raw(
        "(SELECT json_build_object('value', prb.project_deliverable_id, 'label', prd.deliverable_name)) AS project_deliverable_id"
      ),          
      "prb.detail_amount",
      knex.raw(
        "(SELECT json_build_object('value', prb.recovery_area, 'label', rec.recovery_type_name)) AS recovery_area"
      ), 
      knex.raw(
        "(SELECT json_build_object('value', prb.resource_type, 'label', prb.resource_type)) AS resource_type"
      ), 
      "prb.stob",
      "prb.client_coding_id", //TODO: Needs to be updated to use a name, not sure which column that would be at this time. 12/09/2022
      knex.raw(
        "(SELECT json_build_object('value', prb.contract_id, 'label', cr.co_number)) AS contract_id"
      ),     
    ) 
    .from(`${projectBudgetTable} as prb`)
    .leftJoin(`${fiscalYearTable} as fy`, { "prb.fiscal": `fy.id` })
    .leftJoin(`${projectDeliverableTable} as prd`, { "prb.project_deliverable_id": "prd.id" })
    .leftJoin(`${contractsTable} as cr`, { "prb.contract_id": "cr.id" })
    .leftJoin(`${recoveriesTable} as rec`, { "prb.recovery_area": "rec.id" })
    .where("prb.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectBudgetTable).where("id", id).update(body);
};

// Add one.
const addOne = (newJv) => {
  return knex(projectBudgetTable).insert(newJv);
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
};
