const controller = require("@controllers/reports/rpt_PA_ChangeRequestTypesFYSummary.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/rpt_PA_ChangeRequestTypesFYSummary`,
    handler: controller.rpt_PA_ChangeRequestTypesFYSummary,
    /*onRequest: controller.rpt_PA_ChangeRequestTypesFYSummary,
    handler: controller.getReport,
    */
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
