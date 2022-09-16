const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const jvTable = `${dataBaseSchemas().data}.jv`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;

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
    .orderBy("jv.jv_number")
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
      knex.raw(
        "(SELECT json_build_object('value', jv.fiscal_year_id, 'label', fiscal_year.fiscal_year)) AS fiscal_year_id"
      ),
      "jv.client_coding_id"
    )
    .from(jvTable)
    .leftJoin(fiscalYearTable, { "jv.fiscal_year_id": `${fiscalYearTable}.id` })
    .where("jv.id", id)
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
