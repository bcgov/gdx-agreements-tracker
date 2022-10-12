const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const changeRequestTable = `${dataBaseSchemas().data}.change_request`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const changeRequestTypeTable = `${dataBaseSchemas().data}.change_request_crtype`;
const crTypeTable = `${dataBaseSchemas().data}.crtype`;

// Find all where link_id equals the project_id
const findAll = (projectId) => {
  const typesAgg = knex()
    .select(knex.raw("string_agg(t.crtype_name, ', ')"))
    .from(`${changeRequestTypeTable} as crt`)
    .leftJoin(`${crTypeTable} as t`, function () {
      this.on("t.id", "=", "crt.crtype_id").on("crt.change_request_id", "=", "change_request.id");
    });

  return (
    knex(`${changeRequestTable}`)
      .columns(
        "change_request.id",
        "change_request.version",
        { init_date: "change_request.initiation_date" },
        { types: typesAgg },
        "change_request.initiated_by",
        "change_request.summary",
        "change_request.link_id"
      )
      .select()
      .from(changeRequestTable)
      //.leftJoin(fiscalYearTable, { "change_request.fiscal_year": `${fiscalYearTable}.id` })
      .where({ link_id: projectId })
  );
};

// Get specific one by id.
const findById = (changeRequestId, projectId) => {
  return knex(`${changeRequestTable}`)
    .columns(
      "change_request.id",
      "change_request.version",
      "change_request.initiation_date",
      "change_request.cr_contact",
      knex.raw(
        "( SELECT json_build_object('value', change_request.initiated_by, 'label', change_request.initiated_by)) AS initiated_by"
      ),
      knex.raw(
        "( SELECT json_build_object('value', change_request.fiscal_year, 'label', fiscal_year.fiscal_year)) AS fiscal_year"
      ),
      "change_request.summary",
      "change_request.approval_date",
      "change_request.link_id"
    )
    .select()
    .leftJoin(fiscalYearTable, { "change_request.fiscal_year": `${fiscalYearTable}.id` })
    .where({ "change_request.id": changeRequestId })
    .where({ "change_request.link_id": projectId })
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(changeRequestTable).where("id", id).update(body);
};

// Add one.
const addOne = (newChangeRequest) => {
  return knex(changeRequestTable).insert(newChangeRequest);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
