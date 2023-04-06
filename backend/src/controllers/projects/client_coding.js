const useController = require("../useController/index");
const model = require("@models/projects/client_coding");
const what = { single: "client-coding", plural: "client-codings" };
const controller = useController(model, what, "projects");

/**
 * Gets all client coding results for a specific project.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getAllByProjectId = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const projectId = Number(request.params.id);
  try {
    const result = await model.findAllByProjectId(Number(projectId));
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Adds a client coding with a project id.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.addOneWithProjectId = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const projectId = Number(request.params.id);
  try {
    const result = await model.addOneWithProjectId(request.body, projectId);
    return result || controller.noQuery(reply, `The ${what.single} could not be added.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
