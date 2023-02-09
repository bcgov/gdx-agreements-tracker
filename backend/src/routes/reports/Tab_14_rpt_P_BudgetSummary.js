const controller = require("@controllers/reports/Tab_14_rpt_P_BudgetSummary.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_14_rpt_P_BudgetSummary`,
    onRequest: controller.Tab_14_rpt_P_BudgetSummary,
    handler: controller.getReport,
  },
];
const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => fastify.route(route));
  done();
};

module.exports = {
  registerRoutes,
};
