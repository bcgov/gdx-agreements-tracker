const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const dBLockTable = `${dataBaseSchemas().data}.db_lock`;

// Add one.
const addLockByParams = (requestData) => {
  return knex(dBLockTable).insert(requestData);
};

// Remove one.
const removeOne = (requestData) => {
  const { locked_row_id, locked_table, locked_by } = requestData;
  return knex(`${dBLockTable} as dbLock`)
    .where("dbLock.locked_table", locked_table)
    .where("dbLock.locked_by", locked_by)
    .where("dbLock.locked_row_id", locked_row_id)
    .del();
};

// Get specific one by id.
const getLockByParams = (requestData, reply) => {
  const { locked_row_id, locked_table, locked_by } = requestData;
  const getLock = knex
    .select("dbLock.*")
    .from(`${dBLockTable} as dbLock`)
    .where("dbLock.locked_row_id", locked_row_id)
    .where("dbLock.locked_table", locked_table)
    .first()
    .then((rows) => {
      // no matching lock found
      if (0 === rows?.length) {
        //No content (204)
        //TODO Move the reply functionality to the plugin backend/src/plugins/fastifyRowLockCheck/index.js
        // reply.code(204);
        return {
          message: `No lock found for ${locked_by} on table ${locked_table} for row id ${locked_row_id}`,
        };
      } else {
        return rows;
      }
    })
    .catch((err) => {
      throw err;
    });

  return getLock;
};

module.exports = {
  addLockByParams,
  removeOne,
  getLockByParams,
};
