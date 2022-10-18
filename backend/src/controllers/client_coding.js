const useController = require("./useController/index.js");
const model = require("../models/client_coding");
const what = { single: "client-coding", plural: "client-codings" };
const controller = useController(model, what, "projects");

controller.getAllByProjectId = async (request, reply) => {
  controller.userRequires(request, what, "projects_read_all");
  const projectId = Number(request.params.id);
  try {
    const result = await model.findAll(Number(projectId));
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

controller.addOneWithProjectId = async (request, reply) => {
  controller.userRequires(request, what, `projects_add_one`);
  const projectId = Number(request.params.id);
  try {
    const result = await model.addOne(request.body, projectId);
    return result || controller.noQuery(reply, `The ${what.single} could not be added.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
