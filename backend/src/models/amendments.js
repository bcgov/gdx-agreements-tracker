const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const contractAmendmentTable = `${dataBaseSchemas().data}.contract_amendment`;
const contractsTable = `${dataBaseSchemas().data}.contract`;
const contractAmendmentTypeTable = `${dataBaseSchemas().data}.amendment_type`;

// Get all.
const findAll = (contractId) => {
  return knex
    .select(
      "contract_amendment.id",
      "contract.co_number as contract",
      "amendment_type.amendment_type_name AS amendment_type",
      knex.raw(
        "TO_CHAR(contract_amendment.amendment_date :: DATE, 'dd-MON-yyyy') as amendment_date"
      ),
      "contract_amendment.description"
    )
    .from(contractAmendmentTable)
    .leftJoin(contractsTable, { "contract_amendment.contract_id": `${contractsTable}.id` })
    .leftJoin(contractAmendmentTypeTable, {
      "contract_amendment.amendment_number": `${contractAmendmentTypeTable}.id`,
    })
    .where({ contract_id: contractId });
};

// Get specific one by id.
const findById = (contractId, amendmentId) => {
  return knex
    .select(
      "contract_amendment.id",
      //"amendment_type.amendment_type_name AS Amendment Type",
      knex.raw(
        "( SELECT json_build_object('value', contract_amendment.contract_id, 'label', contract.co_number)) AS contract_id"
      ),
      knex.raw(
        "( SELECT json_build_object('value', contract_amendment.amendment_number, 'label', amendment_type.amendment_type_name)) AS amendment_number"
      ),
      "contract_amendment.description",
      "contract_amendment.amendment_date"
    )
    .from(contractAmendmentTable)
    .leftJoin(contractsTable, { "contract_amendment.contract_id": `${contractsTable}.id` })
    .leftJoin(contractAmendmentTypeTable, {
      "contract_amendment.amendment_number": `${contractAmendmentTypeTable}.id`,
    })
    .where({ contract_id: contractId })
    .where({ "contract_amendment.id": amendmentId })
};

// Update one.
const updateOne = (body, id) => {
  return knex(contractAmendmentTable).where("id", id).update(body);
};

// Add one.
const addOne = (newContractAmendment) => {
  return knex(contractAmendmentTable).insert(newContractAmendment);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
