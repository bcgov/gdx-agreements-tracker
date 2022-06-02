const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas()[1]}.form_layouts`;

// Get all.
const findAll = () => {
  return db(table);
};

module.exports = {
  findAll,
};
