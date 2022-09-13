const useController = require("./useController/index.js");
const model = require("../models/amendments");
const what = { single: "amendment", plural: "amendments" };
const controller = useController(model, what, "contracts");

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getContractAmendment = async (request, reply) => {
  controller.userRequires(request, what, "contracts_read_all");
  const contractId = Number(request.params.contractId);
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
