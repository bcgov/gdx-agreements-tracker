const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().config}.form_layouts`;

const model = () => {
  // Get all.
  const findAll = () => {
    return db(table);
  };

  return {
    findAll,
  };
};

export default model;
