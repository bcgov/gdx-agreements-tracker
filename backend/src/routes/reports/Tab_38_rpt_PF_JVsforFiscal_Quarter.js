const controller = require("@controllers/reports/Tab_38_rpt_PF_JVsforFiscal_Quarter.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_38_rpt_PF_JVsforFiscal_Quarter`,
    onRequest: controller.Tab_38_rpt_PF_JVsforFiscal_Quarter,
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
