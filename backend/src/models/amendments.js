const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const contractAmendmentTable = `${dbConnection.dataBaseSchemas().data}.contract_amendment`;
const contractsTable = `${dbConnection.dataBaseSchemas().data}.contract`;

// Get all.
const findAll = (contractId) => {
  return db
    .select(
      "contract_amendment.id",
      "contract_amendment.amendment_number",
      "contract.co_number",
      "contract_amendment.amendment_date",
      "contract_amendment.description"
    )
    .from(contractAmendmentTable)
    .leftJoin(contractsTable, { "contract_amendment.contract_id": `${contractsTable}.id` })
    .where({ contract_id: contractId });
};

// Get specific one by id.
const findById = (contractId) => {
  return db(contractsTable).where("id", contractId);
};

module.exports = {
  findAll,
  findById,
};
