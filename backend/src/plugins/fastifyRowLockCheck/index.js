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
          dbRowLock = {
            locked: true,
            locked_by: lockInfo.locked_by,
            currentUser: lockInfo.locked_by === requestData.locked_by ? true : false,
            lockId: lockInfo.id,
            locked_table: lockInfo.locked_table,
            locked_row_id: lockInfo.locked_row_id,
          };
        } else {
          dbRowLock = { locked: false, locked_by: null };
        }
      })
      .catch((error) => error);
  };

  const addLockStatus = async (request, reply, payload) => {
    payload = {
      data: payload,
    };
    if (
      request.headers.locked_table &&
      request.headers.locked_row_id &&
      request.headers.locked_by
    ) {
      payload.dbRowLock = dbRowLock;
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
