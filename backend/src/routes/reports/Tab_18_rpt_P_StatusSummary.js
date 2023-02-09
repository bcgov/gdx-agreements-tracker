const controller = require("@controllers/reports/Tab_18_rpt_P_StatusSummary.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_18_rpt_P_StatusSummary`,
    onRequest: controller.Tab_18_rpt_P_StatusSummary,
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
