const controller = require("@controllers/reports/Tab_19_rpt_PA_ActiveProjectsbyPortfolio.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_19_rpt_PA_ActiveProjectsbyPortfolio`,
    onRequest: controller.Tab_19_rpt_PA_ActiveProjectsbyPortfolio,
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
