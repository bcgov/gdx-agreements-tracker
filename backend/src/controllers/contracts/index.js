const useController = require("../useController/index.js");
const model = require("@models/contracts/index");
const subcontractorsModel = require("@models/admin/subcontractors");
const what = { single: "contract", plural: "contracts" };
const controller = useController(model, what);

controller.getOneWithSubcontractors = async (request, reply) => {
  try {
    const result = await model.findById(request.params.id);
    // Attach all subcontractors associated with the contract.
    if (result) {
      result.subcontractor_id = await subcontractorsModel.findByContractId(request.params.id);
    }
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Gets all contract resources for a specific contract.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.budgetsByFiscal = async (request, reply) => {
  const contractId = Number(request.params.id);
  try {
    const result = await model.findBudgetsByFiscal(Number(contractId));
    return !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
