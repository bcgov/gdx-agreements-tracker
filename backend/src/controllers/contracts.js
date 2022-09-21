const useController = require("./useController/index.js");
const model = require("../models/contracts.js");
const subcontractorsModel = require("../models/subcontractors");
const what = { single: "contract", plural: "contracts" };
const controller = useController(model, what);

controller.getOne = async (request, reply) => {
  controller.userRequires(request, what, "contracts_read_all");
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

module.exports = controller;
