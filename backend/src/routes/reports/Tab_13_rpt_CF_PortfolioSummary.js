const controller = require("@controllers/reports/Tab_13_rpt_CF_PortfolioSummary.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_13_rpt_CF_PortfolioSummary`,
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
