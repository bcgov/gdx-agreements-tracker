const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const changeRequestTable = `${dbConnection.dataBaseSchemas().data}.change_request`;
const fiscalYearTable = `${dbConnection.dataBaseSchemas().data}.fiscal_year`;
// Find all where link_id equals the project_id
const findAll = (projectId) => {
  return db
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
  return db
    .select(
      "change_request.id",
      "change_request.version",
      "change_request.initiation_date",
      "change_request.cr_contact",
      db.raw(
        "( SELECT json_build_object('value', change_request.initiated_by, 'label', change_request.initiated_by)) AS initiated_by"
      ),
      db.raw(
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
  return db(changeRequestTable).where("id", id).update(body);
};

// Add one.
const addOne = (newChangeRequest) => {
  return db(changeRequestTable).insert(newChangeRequest);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
