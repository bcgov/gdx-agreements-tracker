const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.subcontractor`;

// Get all.
const findAll = () => {
  return knex(table).select("id", "subcontractor_name");
};

// Get specific one by id.
const findById = (id) => {
  return knex(table).select("id", "subcontractor_name").where("id", id).first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newSubcontractor) => {
  return knex(table).insert(newSubcontractor);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
