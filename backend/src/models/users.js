const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = "users";

// Get all.
const findAll = () => {
  return db(table);
};

// Get specific one by id.
const findById = (id) => {
  return db(table).where("id", id);
};

// Get specific user by email.
const findByEmail = (email) => {
  return db(table).where("email", email);
};

// Add one.
const addOne = (userInfo) => {
  const newUser = {
    name: userInfo.name,
    email: userInfo.email,
    username: userInfo.preferred_username,
  };
  return db(table).insert(newUser, "id");
};

// Update one.
const updateOne = (id, target) => {
  return db(table).where("id", id).update(target);
};

// Remove one.
// TODO: change to soft delete.
const removeOne = (id) => {
  return db(table).where("id", id).del();
};

const addRoleToOne = (roleName, userId) => {
  db("roles")
    .pluck("id")
    .where("name", roleName)
    .then((roleId) => {
      return db("user_roles").insert({ role_id: roleId[0], user_id: userId }, "id");
    });
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  addOne,
  updateOne,
  removeOne,
  addRoleToOne,
};
