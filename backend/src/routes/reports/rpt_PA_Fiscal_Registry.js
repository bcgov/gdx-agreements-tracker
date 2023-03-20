const controller = require("@controllers/reports/rpt_PA_Fiscal_Registry.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/rpt_PA_Fiscal_Registry`,
    onRequest: controller.rpt_PA_Fiscal_Registry,
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
