const useController = require("./useController/index.js");
const model = require("../models/projects");
const contractsModel = require("../models/contracts.js");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);

/**
 * Get a specific project's close out data.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getCloseOut = async (request, reply) => {
  controller.userRequires(request, what, "projects_read_all");
  let output;
  const targetId = Number(request.params.id);
  try {
    const result = await model.findCloseOutById(targetId);
    output = !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Sends notification email when a project is closed out.
 *
 * @todo This should send email via CHES API. Also needs email content.
 * @see https://bcgov.github.io/common-service-showcase/services/ches.html
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.notifyCloseOut = async (request, reply) => {
  controller.userRequires(request, what, "projects_read_all");
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
controller.getOneWithContracts = async (request, reply) => {
  controller.userRequires(request, what, "projects_read_all");
  let output;
  const targetId = Number(request.params.id);
  try {
    const result = await model.findById(targetId);
    if (result) {
      result.contracts = await contractsModel.findByProjectId(targetId);
    }
    output = !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

module.exports = controller;
