const dbConnection = require("@database/databaseConnection");
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
const findById = (changeRequestId) => {
  return knex(`${changeRequestTable}`)
    .columns(
      "change_request.id",
      "change_request.version",
      "change_request.initiation_date",
      "change_request.cr_contact",
      knex.raw(
        "( SELECT jsonb_agg(jsonb_build_object( 'cr_type', crtype.crtype_name, 'inactive', crtype.inactive )) FROM data.change_request_crtype crcrtype LEFT JOIN data.crtype crtype ON crtype.id = crcrtype.crtype_id WHERE crcrtype.change_request_id = change_request.id ) AS types"
      ),
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

// Find all where link_id equals the project_id
const getNextCRVersion = () => {
  return knex
    .select(knex.raw("'CR-' || MAX(CAST(match[1] AS INTEGER)+1) as cr_version"))
    .from(function () {
      this.select(knex.raw("REGEXP_MATCHES(version, '(\\d+)', 'g') AS match"))
        .from("change_request")
        .whereRaw("version ~ '^s*CR-\\d+s*$'")
        .as("matches");
    });
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
  getNextCRVersion,
};
