const useController = require("@controllers/useController");
const model = require("@models/projects/closeout");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);
const _ = require("lodash");

/**
 * Sends notification email when a project is closed out.
 *
 * @todo This should send email via CHES API. Also needs email content.
 * @see https://bcgov.github.io/common-service-showcase/services/ches.html
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.notify = async (request, reply) => {
  let output;
  // const targetId = Number(request.params.projectId);
  try {
    const message = {
      body: "[User/contact X closed out project Y]",
      from: "?",
      subject: "?",
      // Should be replaced in dev environment.
      to: "gax.pmo@gov.bc.ca",
    };
    // const result = ches.send(message);
    const result = message;
    output = !result ? controller.noQuery(reply, `Notification could not be sent.`) : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getOneById = async (request, reply) => {
  const targetId = Number(request.params.id);
  try {
    const result = await model.findById(targetId);

    if (result) {
      // Record whether the user can edit the closeout table
      // and add it to the result object.
      result.hasPMOAdminEditCapability =
        "PMO-Manager-Edit-Capability" === request.routeConfig?.role;

      return result;
    } else {
      return controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`);
    }
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
