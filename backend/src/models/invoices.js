const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.invoice`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;

// Get all.
const findAllByContractId = (contractId) => {
  return knex
    .select("i.*", "fy.fiscal_year")
    .from(`${table} as i`)
    .join(`${fiscalYearTable} as fy`, { "i.fiscal": "fy.id" })
    .where("i.contract_id", contractId);
};

// Get specific one by id.
const findById = (invoiceId) => {
  return knex.select("*").from(table).where("id", invoiceId).first();
};

module.exports = {
  findAllByContractId,
  findById,
};
