const useController = require("../useController/index.js");
const model = require("@models/projects/project_status");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);

controller.findAllByProject = async (request, reply) => {
  try {
    const targetId = Number(request.params.id);
    const result = await model.findAll(targetId);
    return result ? result : [];
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
