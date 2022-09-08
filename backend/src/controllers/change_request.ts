import model from "../models/change_request.js";
const what = { single: "change_request", plural: "change_requests" };

import { IController } from "../types";
import adminForm from "./admin_form.js";
import { useController } from "./useController";

const controller: IController = useController(model, "amendments_read_all", what);
const { failedQuery, noQuery, userRequires } = adminForm();
/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getContractAmendment = async (request, reply) => {
  userRequires(request, what, "amendments_read_all");
  const contractId = Number(request.params.contractId);
  const amendmentId = Number(request.params.amendmentId);
  try {
    const result = await model.findById(Number(contractId), Number(amendmentId));
    return !result || !result.length
      ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result[0];
  } catch (err) {
    return failedQuery(reply, err, what);
  }
};

export default controller;
