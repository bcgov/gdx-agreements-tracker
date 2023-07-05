const controller = require("@controllers/reports/rpt_PA_Fiscal_Registry.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/rpt_PA_Fiscal_Registry`,
    schema: getReport,
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
