const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const jvTable = `${dataBaseSchemas().data}.jv`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const clientCodingTable = `${dataBaseSchemas().data}.client_coding`;
const contactTable = `${dataBaseSchemas().data}.contact`;

const findAll = (projectId) => {
  return knex(jvTable)
    .columns(
      "jv.id",
      "jv.jv_number",
      "jv.billed_date",
      "jv.amount",
      "jv.quarter",
      "jv.project_id",
      { fiscal: `${fiscalYearTable}.fiscal_year` },
      {
        financial_contact: knex.raw(
          `CONCAT(${contactTable}.last_name, ', ', ${contactTable}.first_name)`
        ),
      }
    )
    .select()
    .leftJoin(fiscalYearTable, { "jv.fiscal_year_id": `${fiscalYearTable}.id` })
    .leftJoin(clientCodingTable, { "jv.client_coding_id": `${clientCodingTable}.id` })
    .leftJoin(contactTable, { "client_coding.contact_id": `${contactTable}.id` })
    .orderBy("jv.jv_number")
    .where({ "jv.project_id": projectId });
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
      knex.raw(
        "(SELECT json_build_object('value', COALESCE(jv.client_coding_id,0), 'label', COALESCE(client_coding.program_area, client_coding.client))) AS client_coding_id"
      )
    )
    .from(jvTable)
    .leftJoin(fiscalYearTable, { "jv.fiscal_year_id": `${fiscalYearTable}.id` })
    .leftJoin(clientCodingTable, { "jv.client_coding_id": `${clientCodingTable}.id` })
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
