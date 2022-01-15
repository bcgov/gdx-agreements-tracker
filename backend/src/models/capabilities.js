const DatabaseConnection = require('../database/databaseConnection');
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = "capabilities";

// Get all.
const findAll = () => {
  return db(table);
};

// Given a user, retrieve all of their capabilities, as determined by their applied roles.
const findAllByUserId = (user_id) => {
  return db(table)
    .select(`${table}.name`)
    .join('role_capabilities as rc', 'rc.capability_id', `${table}.id`)
    .join('user_roles as ur', 'ur.role_id', `rc.role_id`)
    .where({'ur.user_id': user_id});
}

module.exports = {
  findAll,
  findAllByUserId,
};
