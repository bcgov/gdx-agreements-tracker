const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.subcontractor`;

const model = () => {
  // Get all.
  const findAll = () => {
    return db(table).select("id", "subcontractor_name");
  };

  // Get specific one by id.
  const findById = (id) => {
    return db(table).select("id", "subcontractor_name").where("id", id);
  };

  // Update one.
  const updateOne = (body, id) => {
    return db(table).where("id", id).update(body);
  };

  // Add one.
  const addOne = (newSubcontractor) => {
    return db(table).insert(newSubcontractor);
  };
  return {
    findAll,
    findById,
    updateOne,
    addOne,
  };
};

export default model;
