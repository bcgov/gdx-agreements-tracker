const controller = require("@controllers/reports/Tab_15_rpt_P_QuarterlyBillingRequest.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_15_rpt_P_QuarterlyBillingRequest`,
    onRequest: controller.Tab_15_rpt_P_QuarterlyBillingRequest,
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
