const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const userTable = `${dataBaseSchemas().public}.users`;
const cTable = `${dataBaseSchemas().public}.capabilities`;
const rcTable = `${dataBaseSchemas().public}.role_capabilities`;

// Get all.
const findAll = () => {
  return knex(cTable);
};

// Given a user, retrieve all of their capabilities, as determined by their applied roles.
const findAllByUserId = (userId) => {
  return (
    knex(userTable)
      .pluck("public.capabilities.name")
      //For admin users that have not set a previous value, will not have access to picklist,
      //This is solved by coalesce, to give default users as Subscriber
      .joinRaw(`join ${rcTable} on role_capabilities.role_id = COALESCE(${userTable}.role_id,1)`)
      .join(cTable, { "capabilities.id": `${rcTable}.capability_id` })
      .where("users.id", userId)
  );
};

module.exports = {
  findAll,
  findAllByUserId,
};
