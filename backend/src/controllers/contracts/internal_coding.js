const useController = require("@controllers/useController/index");
const model = require("@models/contracts/internal_coding");
const what = { single: "internal coding", plural: "internal codings" };
const controller = useController(model, what, "contracts");

module.exports = controller;

/**
 * Add internal coding based on request body info.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.addOneWithContractId = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const contractId = Number(request.params.id);
  try {
    const result = await model.addOne(request.body, contractId);
    return result || controller.noQuery(reply, `The ${what.single} could not be added.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};
