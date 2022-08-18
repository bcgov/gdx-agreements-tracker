const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.contact`;

// Get all.
const findAll = () => {
  return db(table).select(
    "id",
    "last_name",
    "first_name",
    "contact_title",
    "ministry_id",
    "notes"
  );
};

// Get specific one by id.
const findById = (contactId) => {
  return db(table).where("id", contactId);
};

// Update one.
const updateOne = (body, id) => {
  return db(table).where("id", id).update(body);
};

// Add one.
const addOne = (newContact) => {
  return db(table).insert(newContact);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
