const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = "picker_options";

// Get all.
const findAll = () => {
  return db(table);
};

module.exports = {
  findAll,
};
