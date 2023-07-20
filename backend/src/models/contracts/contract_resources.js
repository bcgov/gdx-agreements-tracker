const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contract_resource`;
const resourceTable = `${dataBaseSchemas().data}.resource`;
const resourceTypeTable = `${dataBaseSchemas().data}.resource_type`;
const fiscalTable = `${dataBaseSchemas().data}.fiscal_year`;
const supplierRateTable = `${dataBaseSchemas().data}.supplier_rate`;

// Get all.
const findAll = (contractId) => {
  return knex
    .select(
      "cr.id",
      "cr.*",
      knex.raw("r.resource_last_name || ', ' || r.resource_first_name as resource"),
      knex.raw("(cr.assignment_rate * cr.hours)::numeric::float8 as fees_for_resource"),
      knex.raw("cr.assignment_rate::numeric::float8"),
      "sr.rate as supplier_rate",
      "rt.resource_type as assignment_role",
      "fy.fiscal_year as fiscal"
    )
    .from(`${table} as cr`)
    .join(`${resourceTable} as r`, { "cr.resource_id": "r.id" })
    .join(`${supplierRateTable} as sr`, { "cr.supplier_rate_id": "sr.id" })
    .join(`${resourceTypeTable} as rt`, { "sr.resource_type_id": "rt.id" })
    .join(`${fiscalTable} as fy`, { "cr.fiscal": "fy.id" })
    .where("cr.contract_id", contractId);
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select(
      "cr.*",
      "rt.resource_type as assignment_role",
      knex.raw("cr.assignment_rate::numeric::float8"),
      knex.raw("( SELECT json_build_object('value', fy.id, 'label', fy.fiscal_year)) as fiscal"),
      knex.raw(
        "( SELECT json_build_object('value', r.id, 'label', r.resource_last_name || ', ' || r.resource_first_name)) as resource_id"
      ),
      knex.raw("( SELECT json_build_object('value', sr.id, 'label', sr.rate)) as supplier_rate_id")
    )
    .from(`${table} as cr`)
    .join(`${resourceTable} as r`, { "cr.resource_id": "r.id" })
    .join(`${supplierRateTable} as sr`, { "cr.supplier_rate_id": "sr.id" })
    .join(`${resourceTypeTable} as rt`, { "sr.resource_type_id": "rt.id" })
    .join(`${fiscalTable} as fy`, { "cr.fiscal": "fy.id" })
    .where("cr.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newResource, contractId) => {
  newResource.contract_id = contractId;
  newResource.start_date = "" === newResource.start_date ? null : newResource.start_date;
  newResource.end_date = "" === newResource.end_date ? null : newResource.end_date;
  return knex(table).insert(newResource);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
