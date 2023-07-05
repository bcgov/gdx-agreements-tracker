const controller = require("@controllers/reports/Tab_15_rpt_P_QuarterlyBillingRequest.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_15_rpt_P_QuarterlyBillingRequest`,
    schema: getReport,
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
