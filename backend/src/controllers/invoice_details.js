const useController = require("./useController/index.js");
const model = require("../models/invoice_details");
const what = { single: "invoice detail", plural: "invoice details" };
const controller = useController(model, what, "contracts");

/**
 * Gets all resources for a specific invoice.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getResourcesByInvoiceId = async (request, reply) => {
  return controller.getDetailsByInvoiceId(request, reply, "resources");
};

/**
 * Gets all deliverables for a specific invoice.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getDeliverablesByInvoiceId = async (request, reply) => {
  return controller.getDetailsByInvoiceId(request, reply, "deliverables");
};

/**
 * Handles requests for either resources or deliverables.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @param   {string}         type    Either "resources" or "deliverables". Determines which kind of invoice detail is returned.
 * @returns {object}
 */
controller.getDetailsByInvoiceId = async (request, reply, type) => {
  controller.userRequires(request, what, "contracts_read_all");
  const invoiceId = Number(request.params.id);
  try {
    const result =
      "resources" === type
        ? await model.findResourcesByInvoiceId(invoiceId)
        : await model.findDeliverablesByInvoiceId(invoiceId);
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

controller.getResourceById = async (request, reply) => {
  controller.userRequires(request, what, "contracts_read_all");
  const detailId = Number(request.params.id);
  try {
    const result = await model.findResourceById(detailId);
    return !result
      ? controller.noQuery(reply, `The resource with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
