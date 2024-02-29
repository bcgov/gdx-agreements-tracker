const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.invoice_detail`;
const contractResourceTable = `${dataBaseSchemas().data}.contract_resource`;
const resourceTable = `${dataBaseSchemas().data}.resource`;
const fiscalTable = `${dataBaseSchemas().data}.fiscal_year`;

// Get all resources by invoice id.
const findAllByInvoiceId = (invoiceId) => {
  return knex
    .select(
      "*",
      { resource_assignment: knex.raw("r.resource_last_name || ', ' || r.resource_first_name") },
      { rate: knex.raw("i.rate") },
      { amount: knex.raw("i.unit_amount * i.rate") },
      { hours: "i.unit_amount" },
      "i.id"
    )
    .from(`${table} as i`)
    .join(`${contractResourceTable} as cr`, { "i.contract_resource_id": "cr.id" })
    .leftJoin(`${resourceTable} as r`, { "cr.resource_id": "r.id" })
    .where("i.invoice_id", invoiceId);
};

// Get one.
const findById = (id) => {
  return knex
    .select(
      "i.id",
      { amount: knex.raw("i.unit_amount * i.rate") },
      knex.raw("i.unit_amount"),
      knex.raw("i.rate"),
      {
        amount_remaining: knex.raw("((cr.assignment_rate * cr.hours) - amount_total.sum)"),
      },
      knex.raw(
        "( SELECT json_build_object('value', cr.resource_id, 'label', (r.resource_last_name || ', ' || r.resource_first_name))) AS contract_resource_id"
      ),
      { fiscal_year: "fy.fiscal_year" }
    )
    .from(`${table} as i`)
    .join(`${contractResourceTable} as cr`, { "i.contract_resource_id": "cr.id" })
    .join(`${resourceTable} as r`, { "cr.resource_id": "r.id" })
    .join(`${fiscalTable} as fy`, { "cr.fiscal": "fy.id" })
    .leftJoin(
      knex(table)
        .select("contract_resource_id", { sum: knex.raw("SUM((unit_amount * rate))") })
        .groupBy("contract_resource_id")
        .as("amount_total"),
      "amount_total.contract_resource_id",
      "i.contract_resource_id"
    )
    .where("i.id", id)
    .first();
};

// Update one.
const updateOne = async (body, id) => {
  // Rate column must match contract_resources.assignment_rate.
  if (body.contract_resource_id) {
    body.rate = await getRate(body.contract_resource_id);
  }
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOneWithInvoiceId = async (newResource, invoiceId) => {
  newResource.invoice_id = invoiceId;
  newResource.rate = await getRate(newResource.contract_resource_id);
  return knex(table).insert(newResource);
};

/**
 * Gets the correct rate for the given contract resource.
 *
 * @param   {number} contractResourceId The id of the contract resource to match rate with.
 * @returns {string}
 */
const getRate = async (contractResourceId) => {
  return knex(contractResourceTable)
    .select("assignment_rate")
    .where("id", contractResourceId)
    .first()
    .then((result) => {
      return result.assignment_rate;
    });
};

module.exports = {
  findAllByInvoiceId,
  findById,
  updateOne,
  addOneWithInvoiceId,
};
