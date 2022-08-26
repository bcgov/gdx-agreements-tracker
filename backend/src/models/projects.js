const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.project`;
const getFromView = `${dbConnection.dataBaseSchemas().data}.projects_with_json`;

// Get all.
const findAll = () => {
  return db(table).select(
    "project_number",
    "project_name",
    "project_version",
    "portfolio_id",
    "project_manager",
    "agreement_end_date",
    "project_status",
    "initiation_date",
    "id"
  );
};

// Get specific one by id.
// Casts money types to float so values are numeric instead of string.
const findById = (projectId) => {
  return db(getFromView)
    .select(
      "*",
      db.raw("planned_budget::numeric::float8"),
      db.raw("total_project_budget::numeric::float8"),
      db.raw("recoverable_amount::numeric::float8")
    )
    .where("id", projectId)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return db(table).where("id", id).update(body);
};

module.exports = {
  findAll,
  findById,
  updateOne,
};
