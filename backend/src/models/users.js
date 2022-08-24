const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().public}.users`;
const rolesTable = `${dbConnection.dataBaseSchemas().public}.roles`;

// Get all.
const findAll = () => {
  return db
    .select("users.id", "users.name", "users.email", "roles.display_name")
    .from(table)
    .leftJoin(rolesTable, { "public.users.role_id": `${rolesTable}.id` });
};

// Get specific one by id.
const findById = (id) => {
  return db
    .select(
      "users.id",
      "users.name",
      "users.email",
      db.raw(
        "(SELECT json_build_object('value', COALESCE(users.role_id,0), 'label', COALESCE(roles.display_name,''))) AS role_id"
      )
    )
    .from(table)
    .leftJoin(rolesTable, { "public.users.role_id": `${rolesTable}.id` })
    .where("users.id", id);
};

// Get specific user by email.
const findByEmail = (email) => {
  return db(table).where("email", email);
};

// Add one.
const addOne = (userInfo) => {
  const createUser = {
    username: "",
    email: userInfo.email,
    name: userInfo.name,
    role_id: userInfo.role_id,
  };
  return db(table).insert(createUser);
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
