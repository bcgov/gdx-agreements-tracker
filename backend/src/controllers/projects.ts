import model from "../models/projects";
import contractsModel from "../models/contracts.js";
import { IController } from "../types";
import { useController } from "./useController";
import adminForm from "./admin_form"

const what = { single: "project", plural: "projects" };
const { failedQuery, noQuery, userRequires } = adminForm()
const {findCloseOutById} = model()
const controller: IController = useController(model, "projects_update_all", what);

/**
 * Get a specific project's close out data.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
 controller.getCloseOut = async (request, reply) => {
  userRequires(request, what, "projects_read_all");
  let output;
  const targetId = Number(request.params.projectId);
  try {
    const result = await findCloseOutById(targetId);
    output = !result
      ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
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
  userRequires(request, what, "projects_read_all");
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
    output = !result ? noQuery(reply, `Notification could not be sent.`) : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
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
  userRequires(request, what, "projects_read_all");
  let output;
  const targetId = Number(request.params.projectId);
  try {
    const result = await (model as any).findById(targetId);
    result.contracts = await (contractsModel as any).findByProjectId(targetId);
    output = !result
      ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

export default controller;