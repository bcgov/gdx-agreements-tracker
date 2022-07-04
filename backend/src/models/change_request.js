const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.change_request`;

// Get all.
const findAll = () => {
  return db(table);
};

// Get specific one by id.
const findById = (id) => {
  return db(table).where("link_id", id);
};

module.exports = {
  findAll,
  findById,
};
