const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas()[2]}.projects`;
// Get all.
const findAll = () => {
  return db(table);
};

// Get specific one by id.
const findById = (id) => {
  return db(table).where("id", id);
};

module.exports = {
  findAll,
  findById,
};
