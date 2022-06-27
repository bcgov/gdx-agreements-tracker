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
const findById = (id) => {
  return db(getFromView).where("id", id);
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
