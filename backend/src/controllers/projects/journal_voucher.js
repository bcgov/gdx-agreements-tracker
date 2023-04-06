const useController = require("../useController/index.js");
const model = require("@models/projects/journal_voucher");
const what = { single: "jv", plural: "jvs" };
const controller = useController(model, what, "projects");

/**
 * Gets all contract Journal vouchers for a specific contract.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getAllJvs = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
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

module.exports = controller;
