const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.project_status`;

const model = () => {
  // Get all.
  const findAll = () => {
    return db(table);
  };

  // Get specific one by id.
  const findById = (projectStatusId) => {
    return db(table).where("id", projectStatusId);
  };
  return {
    findAll,
    findById,
  };
};

export default model;
