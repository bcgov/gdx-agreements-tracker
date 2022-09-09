const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const getFromView = `${dataBaseSchemas().public}.formatted_picker_options`;

// Get all.
const findAll = () => {
  return knex(getFromView);
};

module.exports = {
  findAll,
};
