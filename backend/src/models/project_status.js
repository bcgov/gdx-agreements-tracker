const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.project_status`;

// Get all.
const findAll = () => {
  return knex(table);
};

// Get specific one by id.
const findById = (projectStatusId) => {
  return knex(table).where("id", projectStatusId);
};

module.exports = {
  findAll,
  findById,
};
