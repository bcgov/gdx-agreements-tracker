const controller = require("@controllers/reports/Tab_45_rpt_P_EngagementStatus.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_45_rpt_P_EngagementStatus`,
    schema: getReport,
    onRequest: controller.Tab_45_rpt_P_EngagementStatus,
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
