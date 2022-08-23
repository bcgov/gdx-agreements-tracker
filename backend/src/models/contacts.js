const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.contact`;
const ministryTable = `${dbConnection.dataBaseSchemas().data}.ministry`;

// Get all.
const findAll = () => {
  return db(`${table} as c`)
    .select(
      "c.id",
      "c.last_name",
      "c.first_name",
      "c.contact_title",
      "m.ministry_short_name",
      "c.notes"
    )
    .leftJoin(`${ministryTable} as m`, "c.ministry_id", "m.id");
};

// Get specific one by id.
const findById = (contactId) => {
  return db(`${table} as c`)
    .select(
      "c.*",
      db.raw(
        "( SELECT json_build_object('value', m.id, 'label', m.ministry_name || ' ' || m.ministry_short_name) as ministry_id )"
      )
    )
    .leftJoin(`${ministryTable} as m`, "c.ministry_id", "m.id")
    .where("c.id", contactId)
    .first();
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
