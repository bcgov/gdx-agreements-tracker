const useController = require("../useController/index");
const model = require("@models/contracts/amendments");
const what = { single: "amendment", plural: "amendments" };
const controller = useController(model, what, "contracts");

/**
 * Gets all contract amendments for a specific contract.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getAllAmendments = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const contractId = Number(request.params.id);
  try {
    const result = await model.findAll(Number(contractId));
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
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
controller.getContractAmendment = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const contractId = Number(request.params.id);
  const amendmentId = Number(request.params.amendmentId);
  try {
    const result = await model.findById(Number(contractId), Number(amendmentId));
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
