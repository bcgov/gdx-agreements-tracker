const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.invoice_detail`;
const contractResourceTable = `${dataBaseSchemas().data}.contract_resource`;
const contractDeliverableTable = `${dataBaseSchemas().data}.contract_deliverable`;
const resourceTable = `${dataBaseSchemas().data}.resource`;

// Get all resources by invoice id.
const findResourcesByInvoiceId = (invoiceId) => {
  return knex
    .select(
      "*",
      knex.raw("r.resource_last_name || ', ' || r.resource_first_name as resource_name"),
      knex.raw("i.rate::numeric::float8 as rate"),
      knex.raw("(i.rate * i.unit_amount)::numeric::float8 as amount"),
      "i.unit_amount as hours",
      "i.id"
    )
    .from(`${table} as i`)
    .join(`${contractResourceTable} as cr`, { "i.contract_resource_id": "cr.id" })
    .leftJoin(`${resourceTable} as r`, { "cr.resource_id": "r.resource_id" })
    .where("i.invoice_id", invoiceId);
};

// Get all deliverables by invoice id.
const findDeliverablesByInvoiceId = (invoiceId) => {
  return knex
    .select("*", knex.raw("i.rate::numeric::float8 as rate"), "i.id")
    .from(`${table} as i`)
    .join(`${contractDeliverableTable} as cd`, { "i.contract_deliverable_id": "cd.id" })
    .where("i.invoice_id", invoiceId);
};

const findResourceById = (id) => {
  return knex
    .select(
      "i.id",
      knex.raw("i.unit_amount::numeric::float8"),
      knex.raw("i.rate::numeric::float8"),
      knex.raw(
        "( SELECT json_build_object('value', cr.resource_id, 'label', r.resource_last_name)) AS contract_resource"
      )
    )
    .from(`${table} as i`)
    .join(`${contractResourceTable} as cr`, { "i.contract_resource_id": "cr.id" })
    .join(`${resourceTable} as r`, { "cr.resource_id": "r.resource_id" })
    .where("i.id", id)
    .first();
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select("*", knex.raw("unit_amount::numeric::float8"), knex.raw("rate::numeric::float8"))
    .from(table)
    .where("id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newInvoiceDetail) => {
  return knex(table).insert(newInvoiceDetail);
};

module.exports = {
  findResourcesByInvoiceId,
  findDeliverablesByInvoiceId,
  findResourceById,
  findById,
  updateOne,
  addOne,
};
