const dbLockModel = require("@models/db_lock");
const fp = require("fastify-plugin");

const fastifyRowLockCheck = async (fastify, options) => {
  let dbRowLock = {};

  const getRowLock = async (request, reply) => {
    const requestData = {
      locked_row_id: Number(request.headers.locked_row_id),
      locked_table: request.headers.locked_table,
      locked_by: request.headers.locked_by,
    };

    dbLockModel
      .getLockByParams(requestData)
      .then((lockInfo) => {
        if (lockInfo) {
          if (lockInfo.locked_by === requestData.locked_by) {
            dbRowLock = {
              locked: true,
              locked_by: lockInfo.locked_by,
              currentUser: true,
              lockId: lockInfo.id,
            };
          } else {
            //The user performing this query does not match the user who has the row locked
            dbRowLock = {
              locked: true,
              locked_by: lockInfo.locked_by,
              currentUser: false,
              lockId: lockInfo.id,
            };
          }
        } else {
          dbRowLock = { locked: false, locked_by: null };
        }
      })
      .catch((error) => error);
  };

  const addLockStatus = async (request, reply, payload) => {
    if (
      request.headers.locked_table &&
      request.headers.locked_row_id &&
      request.headers.locked_by
    ) {
      payload.dbRowLock = dbRowLock;
      return payload;
    }
    return payload;
  };

  fastify.addHook("preSerialization", addLockStatus);
  fastify.addHook("onRequest", getRowLock);
};

module.exports = fp(fastifyRowLockCheck, {
  fastify: "4.x",
  name: "fastifyRowLockCheck",
});

// fastify.addHook('preSerialization', async (request, reply, payload) => {
//   return { wrapped: payload }
// })
