const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.supplier`;

// Get all.
const findAll = () => {
  return knex(table).select(
    "id",
    "supplier_number",
    "signing_authority_name",
    "financial_contact_name",
    "province"
  );
};

// Get specific one by id.
const findById = (supplierId) => {
  return knex(table).where("id", supplierId)
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (supplier) => {
  return knex(table).insert(supplier);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
