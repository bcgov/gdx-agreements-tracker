const controller = require("@controllers/reports/Tab_48_rpt_PF_FinanceRecoverySummary.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_48_rpt_PF_FinanceRecoverySummary`,
    schema: getReport,
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
