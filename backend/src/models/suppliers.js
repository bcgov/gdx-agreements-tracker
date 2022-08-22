const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.supplier`;

// Get all.
const findAll = () => {
  return db(table).select(
    "id",
    "supplier_number",
    "signing_authority_name",
    "financial_contact_name",
    "province"
  );
};

// Get specific one by id.
const findById = (supplierId) => {
  return db(table).where("id", supplierId);
};

const updateOne = (body, id) => {
  return db(table).where("id", id).update(body);
};

module.exports = {
  findAll,
  findById,
  updateOne,
};
