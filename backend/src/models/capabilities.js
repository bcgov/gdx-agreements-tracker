const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const userTable = `${dbConnection.dataBaseSchemas().public}.users`;
const cTable = `${dbConnection.dataBaseSchemas().public}.capabilities`;
const rcTable = `${dbConnection.dataBaseSchemas().public}.role_capabilities`;

// Get all.
const findAll = () => {
  return db(table);
};

// Given a user, retrieve all of their capabilities, as determined by their applied roles.
const findAllByUserId = (userId) => {
  return db(userTable)
    .pluck("public.capabilities.name")
    .join(rcTable, { "role_capabilities.role_id": `${userTable}.role_id` })
    .join(cTable, { "capabilities.id": `${rcTable}.capability_id` })
    .where( "users.id",userId);
};

module.exports = {
  findAll,
  findAllByUserId,
};
