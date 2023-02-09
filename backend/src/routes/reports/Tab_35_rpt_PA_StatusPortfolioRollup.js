const controller = require("@controllers/reports/Tab_35_rpt_PA_StatusPortfolioRollup.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_35_rpt_PA_StatusPortfolioRollup`,
    onRequest: controller.Tab_35_rpt_PA_StatusPortfolioRollup,
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
