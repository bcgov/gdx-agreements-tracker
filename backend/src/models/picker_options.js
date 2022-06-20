const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const getFromView = `${dbConnection.dataBaseSchemas().public}.formatted_picker_options`;


// Get all.
const findAll = () => {
  return db(getFromView);
};

module.exports = {
  findAll,
};


