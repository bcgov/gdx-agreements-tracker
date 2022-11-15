const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.project_status`;

// Get all.
const findAll = (projectId) => {
  return knex
    .columns(
      "contract_amendment.id",
      "contract.co_number as contract",
      {
        amendment_date: knex.raw(
          "TO_CHAR(contract_amendment.amendment_date :: DATE, 'dd-MON-yyyy')"
        ),
      },
      { amendment_type: "amendment_type.amendment_type_name" },
      "contract_amendment.description"
    )
    .select()
    .from(contractAmendmentTable)
    .leftJoin(contractsTable, { "contract_amendment.contract_id": `${contractsTable}.id` })
    .leftJoin(contractAmendmentTypeTable, {
      "contract_amendment.amendment_number": `${contractAmendmentTypeTable}.id`,
    })
    .where({ contract_id: projectId });
};

// Get specific one by id.
const findById = (projectStatusId) => {
  return knex(table).where("id", projectStatusId);
};

module.exports = {
  findAll,
  findById,
};
