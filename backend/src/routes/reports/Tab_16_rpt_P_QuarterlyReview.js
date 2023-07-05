const controller = require("@controllers/reports/Tab_16_rpt_P_QuarterlyReview.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_16_rpt_P_QuarterlyReview`,
    schema: getReport,
    onRequest: controller.Tab_16_rpt_P_QuarterlyReview,
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
