const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().config}.db_logs`;

// Get all.
const findAll = () => {
  return knex.select("*").from(table);
};

module.exports = {
  findAll,
};
