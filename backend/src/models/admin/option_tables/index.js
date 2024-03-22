const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

const optionTablesModel = (request, id) => {
  const tableName = request.url.split("/")[1];
  const findAll = () => {
    return knex(`${tableName} as t`).columns(
      { label: "t.label" },
      { value: "t.value" },
      { id: "t.id" }
    );
  };

  // Get specific one by id.
  const findById = () => {
    return knex
      .select({ label: "t.label" }, { value: "t.value" }, { id: "t.id" })
      .from(`${tableName} as t`)
      .where("t.id", id)
      .first();
  };

  // Update one.
  const updateOne = () => {
    return knex(tableName).where("id", id).update(request.body);
  };

  // Add one.
  const addOne = () => {
    return knex(tableName).insert(request.body);
  };

  return { findAll, findById, updateOne, addOne };
};

module.exports = {
  optionTablesModel,
};
