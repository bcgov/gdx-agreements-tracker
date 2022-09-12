const model = require("../models/change_request");
const useController = require("./useController/index.js");
const what = { single: "change_request", plural: "change_requests" };
const controller = useController(model, "amendments_read_all", what);
/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getContractAmendment = async (request, reply) => {
  controller.userRequires(request, what, "amendments_read_all");
  const contractId = Number(request.params.contractId);
  const amendmentId = Number(request.params.amendmentId);
  try {
    const result = await model.findById(Number(contractId), Number(amendmentId));
    return !result || !result.length
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result[0];
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getAllById = async (request, reply) => {
  controller.userRequires(request, what, "amendments_read_all");
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
  controller.userRequires(request, what, "amendments_read_all");
  const projectId = Number(request.params.projectId);
  const changeRequestId = Number(request.params.changeRequestId);
  try {
    const result = await model.findById(changeRequestId, projectId); //////////////////////////////////////
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
