const controller = require("@controllers/reports/Tab_14_rpt_P_BudgetSummary.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_14_rpt_P_BudgetSummary`,
    schema: getReport,
    preHandler: controller.Tab_14_rpt_P_BudgetSummary,
    handler: controller.getReport,
    config: {
      role: "PMO-Reports-Capability",
    },
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
