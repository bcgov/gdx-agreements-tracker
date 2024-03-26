const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

const optionTablesModel = (request, id) => {
  const tableName = request.url.split("/")[1];
  const findAll = () => {
    return knex(`${tableName} as t`).columns({ label: "t.label" }, { id: "t.id" });
  };

  // Get specific one by id.
  const findById = () => {
    return knex
      .select({ label: "t.label" }, { id: "t.id" })
      .from(`${tableName} as t`)
      .where("t.id", id)
      .first();
  };

  const updateOne = () => {
    const { label } = request || {};
    return knex(tableName).where("id", id).update({ value: label, label: label });
  };

  const addOne = () => {
    const { label } = request?.body || {};
    return knex(tableName).insert({ value: label, label: label });
  };

  return { findAll, findById, updateOne, addOne };
};

module.exports = {
  optionTablesModel,
};
