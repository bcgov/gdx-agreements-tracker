const controller = require("@controllers/reports/Tab_38_rpt_PF_JVsforFiscal_Quarter.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_38_rpt_PF_JVsforFiscal_Quarter`,
    schema: getReport,
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
