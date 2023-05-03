const useController = require("@controllers/useController/index");
const model = require("@models/db_lock");
const what = { single: "db_lock", plural: "db_locks" };
const controller = useController(model, what, "db_lock");

controller.addLockByParams = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  try {
    const requestData = {
      locked_row_ids: request.body.params.locked_row_ids,
      locked_table: request.body.params.locked_table,
      locked_by: request.body.params.locked_by,
      locked_date: request.body.params.locked_date,
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
      locked_row_ids: request.body.params.locked_row_ids,
      locked_table: request.body.params.locked_table,
      locked_by: request.body.params.locked_by,
      locked_date: request.body.params.locked_date,
    };

    const result = await model.getLockByParams(requestData, reply);
    if (!result) {
      return await model.addLockByParams(requestData).then(() => {
        return {
          locked: false,
          lockedBy: requestData.locked_by,
        };
      });
    } else {
      if (result.locked_by === requestData.locked_by) {
        return {
          locked: false,
          lockedBy: result.locked_by,
        };
      } else {
        return {
          locked: true,
          lockedBy: result.locked_by,
        };
      }
    }
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

controller.deleteLockByParams = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const requestData = {
    locked_row_ids: request.body.params.locked_row_ids,
    locked_table: request.body.params.locked_table,
    locked_by: request.body.params.locked_by,
  };

  try {
    const result = await model.removeOne(requestData);
    return result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
