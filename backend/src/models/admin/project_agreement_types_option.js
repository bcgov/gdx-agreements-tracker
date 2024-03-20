const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const projectAgreementTypesOptionTable = `${
  dataBaseSchemas().config
}.project_agreement_types_option`;

const findAll = () => {
  return knex(`${projectAgreementTypesOptionTable} as patot`).columns(
    { label: "patot.label" },
    { value: "patot.value" },
    { id: "patot.id" }
  );
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select({ label: "patot.label" }, { value: "patot.value" }, { id: "patot.id" })
    .from(`${projectAgreementTypesOptionTable} as patot`)
    .where("patot.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectAgreementTypesOptionTable).where("id", id).update(body);
};

// Add one.
const addOne = (newOption) => {
  return knex(projectAgreementTypesOptionTable).insert(newOption);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
