const controller = require("@controllers/reports/Tab_13_rpt_CF_PortfolioSummary.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_13_rpt_CF_PortfolioSummary`,
    schema: getReport,
    onRequest: controller.Tab_13_rpt_CF_PortfolioSummary,
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
