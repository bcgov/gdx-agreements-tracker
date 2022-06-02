const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().config}.form_layouts`;

// Get all.
const findAll = () => {
  return db(table);
};

module.exports = {
  findAll,
};
