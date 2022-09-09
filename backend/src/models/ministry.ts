const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.ministry`;

const model = () => {
  // Get all.
  const findAll = () => {
    return db(table).select(
      "id",
      "ministry_name",
      "ministry_short_name",
      db.raw("(CASE WHEN is_active THEN 'Yes' ELSE 'No' END) AS is_active")
    );
  };

  // Get specific one by id.
  const findById = (id) => {
    return db(table)
      .select("id", "ministry_name", "ministry_short_name", "is_active")
      .where("id", id);
  };

  // Update one.
  const updateOne = (id, body) => {
    return db(table).where("id", id).update(body);
  };

  // Add one.
  const addOne = (newMinistry) => {
    return db(table).insert(newMinistry);
  };

  return {
    findAll,
    findById,
    updateOne,
    addOne,
  };
};

export default model;
