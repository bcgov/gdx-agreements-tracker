const controller = require("@controllers/reports/Tab_46_rpt_PA_EngagementExecutiveRollup.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_46_rpt_PA_EngagementExecutiveRollup`,
    schema: getReport,
    onRequest: controller.Tab_46_rpt_PA_EngagementExecutiveRollup,
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
