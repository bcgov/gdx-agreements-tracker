const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.client_coding`;
const contactsTable = `${dataBaseSchemas().data}.contact`;

// Get all.
const findAllByProjectId = (projectId) => {
  return knex
    .select("cc.*", {
      financial_contact: knex.raw("(cont.last_name || ', ' || cont.first_name)"),
    })
    .from(`${table} as cc`)
    .join(`${contactsTable} as cont`, { "cc.contact_id": "cont.id" })
    .where("project_id", projectId);
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select(
      "cc.*",
      { client_amount: knex.raw("cc.client_amount::numeric::float8") },
      {
        contact_id: knex.raw(
          "( SELECT json_build_object('value', cont.id, 'label', (cont.last_name || ', ' || cont.first_name)) )"
        ),
      }
    )
    .from(`${table} as cc`)
    .join(`${contactsTable} as cont`, { "cc.contact_id": "cont.id" })
    .where("cc.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOneWithProjectId = (newClientCoding, projectId) => {
  newClientCoding.project_id = projectId;
  return knex(table).insert(newClientCoding);
};

// Remove one.
const removeOne = (id) => {
  return knex(table).where("id", id).del();
};

module.exports = {
  findAllByProjectId,
  findById,
  updateOne,
  addOneWithProjectId,
  removeOne,
};
