const useController = require("../useController/index.js");
const model = require("@models/projects/change_request");
const what = { single: "change_request", plural: "change_requests" };
const controller = useController(model, what, "projects");

/**
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getAllById = async (request, reply) => {
  try {
    const result = await model.findAll(request.params.id);
    return result ? result : [];
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getOneByTwoIds = async (request, reply) => {
  const projectId = Number(request.params.projectId);
  const changeRequestId = Number(request.params.changeRequestId);
  try {
    const result = await model.findById(changeRequestId, projectId);
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

controller.getNextCRVersion = async (request, reply) => {
  try {
    const result = await model.getNextCRVersion();
    return result ? result : [];
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
