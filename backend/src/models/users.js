const DatabaseConnection = require('../database/databaseConnection');
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = "users";

// Get all.
const findAllUsers = () => {
  return db(table);
};

// Get specific one by id.
const findUserById = (id) => {
  return db(table).where("id", id);
};

// Get specific user by email.
const findUserByEmail = (email) => {
  return db(table).where("email", email);
}

// Add one.
const addUser = (userInfo) => {
  console.log('it me ', userInfo)
  const newUser = {
    name: userInfo.name,
    email: userInfo.email,
    username: userInfo.preferred_username
  }
  return db(table).insert(newUser, "id");
};

// Update one.
const updateUser = (id, target) => {
  return db(table)
    .where("id", id)
    .update(target);
};

// Remove one.
// TODO: change to soft delete.
const removeUser = (id) => {
  return db(table)
    .where("id", id)
    .del();
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  addUser,
  updateUser,
  removeUser
};
