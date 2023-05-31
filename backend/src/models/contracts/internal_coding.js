const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const internalCodingTable = `${dataBaseSchemas().data}.sid_internal_coding`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;

// Get all.
const findAllById = (contractId) => {
  return knex(`${internalCodingTable} as ic`)
    .columns({
      id: "ic.id",
      portfolio: "po.portfolio_name",
      responsibility: "po.responsibility",
      service_line: "po.service_line",
      stob: "ic.stob",
      cas_project_number: "ic.cas_project_number",
      asset_tag: "ic.asset_tag",
      wip_number: "ic.wip_no",
      qualified_receiver: "ic.qualified_receiver",
    })
    .leftJoin(`${portfolioTable} as po`, "ic.portfolio_id", "po.id")
    .where("ic.contract_id", contractId);
};

// Get specific one by id.
const findById = (codingId) => {
  return knex(`${internalCodingTable} as ic`)
    .columns({
      id: "ic.id",
      portfolio_id: knex.raw(
        "( SELECT json_build_object('value', po.id, 'label', po.portfolio_name))"
      ),
      responsibility: "po.responsibility",
      service_line: "po.service_line",
      stob: "ic.stob",
      cas_project_number: "ic.cas_project_number",
      asset_tag: "ic.asset_tag",
      wip_no: "ic.wip_no",
      qualified_receiver: "ic.qualified_receiver",
    })
    .leftJoin(`${portfolioTable} as po`, "ic.portfolio_id", "po.id")
    .where("ic.id", codingId)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(internalCodingTable).where("id", id).update(body);
};

// Add one.
const addOne = (newCoding, contractId) => {
  newCoding.contract_id = contractId;
  return knex(internalCodingTable).insert(newCoding);
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
};
