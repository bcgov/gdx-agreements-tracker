const controller = require("@controllers/reports/Tab_42_rpt_PF_PortfolioStobRecoveries.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_42_rpt_PF_PortfolioStobRecoveries`,
    onRequest: controller.Tab_42_rpt_PF_PortfolioStobRecoveries,
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
