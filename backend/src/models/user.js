const DatabaseConnection = require('../database/databaseConnection');
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = "users";

// Get all.
const find = () => {
  return db(table);
};

// Get specific one by id.
const findById = (id) => {
  return db(table).where("id", id);
};

// Add one.
const add = (target) => {
  return db(table).insert(target, "id");
};

// Update one.
const update = (id, target) => {
  return db(table)
    .where("id", id)
    .update(target);
};

// Remove one.
// TODO: change to soft delete.
const remove = (id) => {
  return db(table)
    .where("id", id)
    .del();
};

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};
