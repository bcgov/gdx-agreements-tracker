const controller = require("@controllers/reports/Tab_46_rpt_PA_EngagementExecutiveRollup.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_46_rpt_PA_EngagementExecutiveRollup`,
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
