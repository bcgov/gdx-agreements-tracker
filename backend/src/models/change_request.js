const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const change_request_table = `${dbConnection.dataBaseSchemas().data}.change_request`;
const fiscal_year_table = `${dbConnection.dataBaseSchemas().data}.fiscal_year`;
// Find all where link_id equals the project_id
const findAll = (project_id) => {
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
    .from(change_request_table)
    .leftJoin(fiscal_year_table, { "change_request.fiscal_year": `${fiscal_year_table}.id` })
    .where({ link_id: project_id });
};

// Get specific one by id.
const findById = (change_request_id, project_id) => {
  console.log("change_request_id", change_request_id);
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
    .from(change_request_table)
    .leftJoin(fiscal_year_table, { "change_request.fiscal_year": `${fiscal_year_table}.id` })
    .where({ "change_request.id": change_request_id })
    .where({ "change_request.link_id": project_id });
};

module.exports = {
  findAll,
  findById,
};
