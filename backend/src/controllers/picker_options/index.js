const useController = require("../useController/index.js");
const model = require("@models/picker_options");
const what = { single: "picker_option", plural: "picker_options" };
const controller = useController(model, what, "general");

controller.findAllByProject = async (request, reply) => {
  try {
    const targetId = Number(request.params.id);
    const result = await model.findAllByProject(targetId);
    return result ? result : [];
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

controller.findAllByContract = async (request, reply) => {
  try {
    const targetId = Number(request.params.id);
    const queryParams = request.query;
    const result = await model.findAllByContract(targetId, queryParams);
    return result ? result : [];
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};
module.exports = controller;
