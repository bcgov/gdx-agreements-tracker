const useController = require("../useController/index.js");
const what = { single: "user", plural: "users" };
const controller = useController(model, what);

/**
 * Get user by email.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */

controller.getByEmail = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  let output;
  const targetEmail = request.body.email;
  try {
    const result = await model.findByEmail(targetEmail);
    output =
      !result || !result.length
        ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
        : result[0];
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

module.exports = controller;
