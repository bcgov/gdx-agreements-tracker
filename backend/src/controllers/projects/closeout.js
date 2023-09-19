const useController = require("@controllers/useController");
const model = require("@models/projects/closeout");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);
const { getRealmRoles } = require("@facilities/keycloak");

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
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
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

    result.hasPMOAdminEditCapability = await controller.getPMOAdminEditCapability(request);

    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Determines the user's edit capability from the request object, which includes
 * keycloak permissions added at the time of login..
 *
 * @param   {object } request - the request object
 * @returns {boolean}         - true if the user has edit capability, false otherwise
 */
controller.getPMOAdminEditCapability = async (request) => {
  const roles = await getRealmRoles(request);
  return (
    roles.includes("PMO-Manager-Edit-Capability") || roles.includes("PMO-Admin-Edit-Capability")
  );
};

module.exports = controller;
