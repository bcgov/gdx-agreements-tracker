const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.project`;
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
  return db(table).where("id", id);
};

module.exports = {
  findAll,
  findById,
};
