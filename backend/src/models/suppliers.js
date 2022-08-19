const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.supplier`;

// Get all.
const findAll = () => {
  return db(table).select(
    "supplier_number",
    "signing_authority_name",
    "financial_contact_name",
    "province"
  );
};

module.exports = {
  findAll,
};
