const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().public}.capabilities`;

// Get all.
const findAll = () => {
  return db(table);
};

// Given a user, retrieve all of their capabilities, as determined by their applied roles.
const findAllByUserId = (userId) => {
  return db(`${table} as c`)
    .pluck("c.name")
    .join("role_capabilities as rc", "rc.capability_id", `c.id`)
    .join("user_roles as ur", "ur.role_id", `rc.role_id`)
    .where({ "ur.user_id": userId });
};

module.exports = {
  findAll,
  findAllByUserId,
};
