const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const changeRequestTable = `${dataBaseSchemas().data}.change_request`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
// Find all where link_id equals the project_id
const findAll = (projectId) => {
  return knex
    .select(
      "change_request.id",
      "change_request.version",
      "change_request.initiation_date",
      "change_request.cr_contact",
      "change_request.initiated_by",
      "fiscal_year.fiscal_year",
      "change_request.summary",
      "change_request.approval_date",
      "change_request.link_id"
    )
    .from(changeRequestTable)
    .leftJoin(fiscalYearTable, { "change_request.fiscal_year": `${fiscalYearTable}.id` })
    .where({ link_id: projectId });
};

// Get specific one by id.
const findById = (changeRequestId, projectId) => {
  return knex
    .select(
      "change_request.id",
      "change_request.version",
      "change_request.initiation_date",
      "change_request.cr_contact",
      knex.raw(
        "( SELECT json_build_object('value', change_request.initiated_by, 'label', change_request.initiated_by)) AS initiated_by"
      ),
      knex.raw(
        "( SELECT json_build_object('value', change_request.fiscal_year, 'label', fiscal_year.fiscal_year)) AS fiscal_year"
      ),
      "change_request.summary",
      "change_request.approval_date",
      "change_request.link_id"
    )
    .from(changeRequestTable)
    .leftJoin(fiscalYearTable, { "change_request.fiscal_year": `${fiscalYearTable}.id` })
    .where({ "change_request.id": changeRequestId })
    .where({ "change_request.link_id": projectId });
};

// Update one.
const updateOne = (body, id) => {
  return knex(changeRequestTable).where("id", id).update(body);
};

// Add one.
const addOne = (newChangeRequest) => {
  return knex(changeRequestTable).insert(newChangeRequest);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
