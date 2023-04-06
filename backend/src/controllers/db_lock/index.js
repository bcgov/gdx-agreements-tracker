const useController = require("@controllers/useController/index");
const model = require("@models/db_lock");
const what = { single: "db_lock", plural: "db_locks" };
const controller = useController(model, what, "db_lock");

controller.addLockByParams = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  try {
    const requestData = {
      locked_row_id: Number(request.body.headers.locked_row_id),
      locked_table: request.body.headers.locked_table,
      locked_by: request.body.headers.locked_by,
      locked_date: request.body.headers.locked_date,
    };

    const result = await model.addLockByParams(requestData, reply);
    return result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

controller.getLockByParams = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);

  try {
    const requestData = {
      locked_row_id: Number(request.headers.locked_row_id),
      locked_table: request.headers.locked_table,
      locked_by: request.headers.locked_by,
      locked_date: request.headers.locked_date,
    };

    const result = await model.getLockByParams(requestData, reply);
    return result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

controller.deleteLockByParams = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);

  const requestData = {
    locked_row_id: Number(request.headers.locked_row_id),
    locked_table: request.headers.locked_table,
    locked_by: request.headers.locked_by,
  };
  try {
    const result = await model.removeOne(requestData);
    return result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
