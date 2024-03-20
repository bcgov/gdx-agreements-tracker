const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const projectAgreementTypeOptionsTable = `${
  dataBaseSchemas().config
}.project_agreement_type_options`;

const findAll = () => {
  return knex(`${projectAgreementTypeOptionsTable} as patot`).columns(
    { label: "patot.label" },
    { value: "patot.value" },
    { id: "patot.id" }
  );
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select({ label: "patot.label" }, { value: "patot.value" }, { id: "patot.id" })
    .from(`${projectAgreementTypeOptionsTable} as patot`)
    .where("patot.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectAgreementTypeOptionsTable).where("id", id).update(body);
};

// Add one.
const addOne = (newOption) => {
  return knex(projectAgreementTypeOptionsTable).insert(newOption);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
