const controller = require("@controllers/reports/Tab_16_rpt_P_QuarterlyReview_multiyrsample.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_16_rpt_P_QuarterlyReview_multiyrsample`,
    onRequest: controller.Tab_16_rpt_P_QuarterlyReview_multiyrsample,
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
