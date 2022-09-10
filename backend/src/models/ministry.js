const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.ministry`;

// Get all.
const findAll = () => {
  return knex(table).select(
    "id",
    "ministry_name",
    "ministry_short_name",
    knex.raw("(CASE WHEN is_active THEN 'Yes' ELSE 'No' END) AS is_active")
  );
};

// Get specific one by id.
const findById = (id) => {
  return knex(table)
    .select("id", "ministry_name", "ministry_short_name", "is_active")
    .where("id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newMinistry) => {
  return knex(table).insert(newMinistry);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
