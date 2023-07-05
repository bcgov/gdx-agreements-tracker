const controller = require("@controllers/reports/Tab_47_rpt_PA_EngagementStatusSummary.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_47_rpt_PA_EngagementStatusSummary`,
    schema: getReport,
    onRequest: controller.Tab_47_rpt_PA_EngagementStatusSummary,
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
