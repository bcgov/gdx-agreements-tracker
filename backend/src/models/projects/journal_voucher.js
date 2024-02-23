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
      { client_coding_id: `${clientCodingTable}.program_area` },
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
      knex.raw(`(
          SELECT json_build_object(
            'program_area', cc.program_area,
            'client', cc.client,
            'responsibility_centre', cc.responsibility_centre,
            'service_line', cc.service_line,
            'stob', cc.stob,
            'project_code', cc.project_code,
            'client_amount', cc.client_amount,
            'value', cc.id)
            ) AS client_coding_id`)
    )
    .from(jvTable)
    .leftJoin(fiscalYearTable, { "jv.fiscal_year_id": `${fiscalYearTable}.id` })
    .leftJoin(`${clientCodingTable} as cc`, { "jv.client_coding_id": "cc.id" })
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
