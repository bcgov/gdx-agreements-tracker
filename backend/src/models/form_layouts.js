const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().config}.form_layouts`;

// Get all.
const findAll = () => {
  return knex(table);
};

module.exports = {
  findAll,
};
