const useController = require("../useController/index.js");
const model = require("@models/contracts/invoice_resources");
const what = { single: "invoice resource", plural: "invoice resources" };
const controller = useController(model, what, "contracts");

/**
 * Gets all invoice resources belonging to the given invoice.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getAllByInvoiceId = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const invoiceId = Number(request.params.id);
  try {
    const result = model.findAllByInvoiceId(invoiceId);
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Add an invoice resource based on request body info.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.addOneWithInvoiceId = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  const invoiceId = Number(request.params.id);
  console.log('invoiceId', invoiceId)
  try {
    const result = await model.addOneWithInvoiceId(request.body, invoiceId);
    return result || controller.noQuery(reply, `The ${what.single} could not be added.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
