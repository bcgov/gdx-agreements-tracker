const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.invoice`;
const invoiceDetailsTable = `${dataBaseSchemas().data}.invoice_detail`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;

// Get all.
const findFiscalBySelectedRow = (invoiceId) => {
  return knex
    .select("fy.id as fiscal_id")
    .from(`${table} as i`)
    .join(`${fiscalYearTable} as fy`, { "i.fiscal": "fy.id" })
    .where("i.id", invoiceId);
};

// Get all.
const findAllByContractId = (contractId) => {
  return knex
    .select(
      "i.*",
      "fy.fiscal_year as fiscal",
      knex.raw(
        `(SELECT SUM(unit_amount * rate) FROM ${invoiceDetailsTable} WHERE invoice_id = i.id) as invoice_total`
      )
    )
    .from(`${table} as i`)
    .join(`${fiscalYearTable} as fy`, { "i.fiscal": "fy.id" })
    .where("i.contract_id", contractId);
};

// Get specific one by id.
const findById = (invoiceId) => {
  return knex
    .select(
      "i.*",
      knex.raw("COALESCE(i.notes, '') as notes"),
      knex.raw("( SELECT json_build_object('value', i.fiscal, 'label', fy.fiscal_year)) AS fiscal"),
      knex.raw(
        `(SELECT SUM(unit_amount * rate) FROM ${invoiceDetailsTable} WHERE invoice_id = i.id) as invoice_total`
      )
    )
    .from(`${table} as i`)
    .join(`${fiscalYearTable} as fy`, { "i.fiscal": "fy.id" })
    .where("i.id", invoiceId)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newInvoice, contractId) => {
  newInvoice.contract_id = contractId;
  return knex(table).insert(newInvoice);
};

const removeOne = (invoiceId) => {
  return knex(`${table} as inv`).where("inv.id", invoiceId).del();
};

module.exports = {
  findAllByContractId,
  findById,
  updateOne,
  addOne,
  removeOne,
  findFiscalBySelectedRow,
};
