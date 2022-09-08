const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().public}.users`;
const rolesTable = `${dbConnection.dataBaseSchemas().public}.roles`;

const userModel = () => {
  // Get all.
  const findAll = () => {
    return db
      .select("users.id", "users.name", "users.email", "roles.display_name")
      .from(table)
      .leftJoin(rolesTable, { "public.users.role_id": `${rolesTable}.id` });
  };

  // Get specific one by id.
  const findById = (id:number) => {
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
  const findByEmail = (email:string) => {
    return db(table).where("email", email);
  };

  // Add one.
  const addOne = (userInfo:any) => {
    const createUser = {
      username: "",
      email: userInfo.email,
      name: userInfo.name,
      role_id: userInfo.role_id,
    };
    return db(table).insert(createUser);
  };

  // Update one.
  const updateOne = (id:number, target:any) => {
    return db(table).where("id", id).update(target);
  };

  // Remove one.
  // TODO: change to soft delete.
  const removeOne = (id:number) => {
    return db(table).where("id", id).del();
  };

  const addRoleToOne = (roleName:string, userId:any) => {
    db("roles")
      .pluck("id")
      .where("name", roleName)
      .then((roleId:any) => {
        return db("user_roles").insert({ role_id: roleId[0], user_id: userId }, "id");
      });
  };
  return {
    findAll,
    findById,
    findByEmail,
    addOne,
    updateOne,
    removeOne,
    addRoleToOne,
  };
};

export default userModel;
