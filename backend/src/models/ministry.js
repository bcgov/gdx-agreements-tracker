const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.ministry`;

// Get all.
const findAll = () => {
  return db(table);
};

module.exports = {
  findAll,
};
