const useController = require("./useController/index.js");
const model = require("../models/invoices");
const what = { single: "invoice", plural: "invoices" };
const controller = useController(model, what, "contracts");

/**
 * Gets all contract invoices for a specific contract.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getAll = async (request, reply) => {
  controller.userRequires(request, what, "contracts_read_all");
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

module.exports = controller;
