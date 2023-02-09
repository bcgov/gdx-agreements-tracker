const controller = require("@controllers/reports/Tab_47_rpt_PA_EngagementStatusSummary.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_47_rpt_PA_EngagementStatusSummary`,
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
