const controller = require("@controllers/reports/Tab_48_rpt_PF_FinanceRecoverySummary.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_48_rpt_PF_FinanceRecoverySummary`,
    onRequest: controller.Tab_48_rpt_PF_FinanceRecoverySummary,
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
