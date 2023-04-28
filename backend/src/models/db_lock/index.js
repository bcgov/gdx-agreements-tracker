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
  return knex.raw(`
  DELETE FROM data.db_lock
  WHERE locked_row_ids && ARRAY [${locked_row_ids}] AND
  locked_table = '${locked_table}' AND
  locked_by = '${locked_by}'
  `);
};

// Get by ids.
const getLockByParams = (requestData) => {
  const { locked_row_ids, locked_table } = requestData;
  return knex
    .select(
      knex.raw(
        `*
        FROM data.db_lock
        WHERE locked_row_ids && ARRAY [${locked_row_ids}] AND
        locked_table = '${locked_table}'
        `
      )
    )
    .first()
    .then((rows) => {
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
