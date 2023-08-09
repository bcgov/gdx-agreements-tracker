const useController = require("@controllers/useController");
const model = require("@models/projects/budget");
const what = { single: "budget", plural: "budgets" };
const controller = useController(model, what, "projects");

controller.fiscalBreakdown = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  try {
    const targetId = Number(request.params.id);
    const result = await model.findProjectBudgetByFiscal(targetId);
    return result ? result : [];
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
