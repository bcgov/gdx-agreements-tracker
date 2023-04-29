const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const dBLockTable = `${dataBaseSchemas().data}.db_lock`;

// Add one.
const addLockByParams = (requestData) => {
  return knex(dBLockTable).insert(requestData);
};

// Remove one.
const removeOne = (requestData) => {
  const { locked_row_ids, locked_table, locked_by } = requestData;
  return knex(dBLockTable)
    .where("locked_table", locked_table)
    .where("locked_by", locked_by)
    .whereIn("locked_row_ids", [[locked_row_ids]])
    .del();
};

// Get by ids.
const getLockByParams = (requestData) => {
  const { locked_row_ids, locked_table } = requestData;
  return knex(dBLockTable)
    .where("locked_table", locked_table)
    .whereIn("locked_row_ids", [[locked_row_ids]])
    .first()
    .then((rows) => {
      console.log("rows", rows);
      return rows;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  addLockByParams,
  removeOne,
  getLockByParams,
};
