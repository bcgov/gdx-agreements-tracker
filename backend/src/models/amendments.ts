const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const contractAmendmentTable = `${dbConnection.dataBaseSchemas().data}.contract_amendment`;
const contractsTable = `${dbConnection.dataBaseSchemas().data}.contract`;
const contractAmendmentTypeTable = `${dbConnection.dataBaseSchemas().data}.amendment_type`;

const model = () => {
  // Get all.
  const findAll = (contractId) => {
    return db
      .select(
        "contract_amendment.id",
        "contract.co_number as contract",
        "amendment_type.amendment_type_name AS amendment_type",
        db.raw(
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
    return db
      .select(
        "contract_amendment.id",
        //"amendment_type.amendment_type_name AS Amendment Type",
        db.raw(
          "( SELECT json_build_object('value', contract_amendment.contract_id, 'label', contract.co_number)) AS contract_id"
        ),
        db.raw(
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
      .where({ "contract_amendment.id": amendmentId });
  };

  // Update one.
  const updateOne = (body, id) => {
    return db(contractAmendmentTable).where("id", id).update(body);
  };

  // Add one.
  const addOne = (newContractAmendment) => {
    return db(contractAmendmentTable).insert(newContractAmendment);
  };
  return { findAll, findById, updateOne, addOne };
};
export default model;