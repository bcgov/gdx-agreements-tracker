const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const jvTable = `${dataBaseSchemas().data}.jv`;

const findAll = (projectId) => {
  return knex
    .select(
      "jv.id",
      "jv.jv_number",
      knex.raw("TO_CHAR(jv.billed_date :: DATE, 'dd-MON-yyyy') as billed_date"),
      "jv.amount",
      "jv.quarter",
      "jv.project_id",
      "jv.fiscal_year_id",
      "jv.client_coding_id"
    )
    .from(jvTable)
    .where({ project_id: projectId });
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select(
      "jv.id",
      "jv.jv_number",
      "jv.billed_date",
      "jv.amount",
      "jv.quarter",
      "jv.project_id",
      "jv.fiscal_year_id",
      "jv.client_coding_id"
    )
    .from(jvTable)
    .where("id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(jvTable).where("id", id).update(body);
};

// Add one.
const addOne = (newJv) => {
  return knex(jvTable).insert(newJv);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
