const controller = require("@controllers/reports/Tab_50_rpt_PF_NetRecoverySummaryByQuarter.js");
const validators = require("@validators/report/tab50");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_50_rpt_PF_NetRecoverySummaryByQuarter`,
    schema: validators.getAll,
    onRequest: controller.Tab_50_rpt_PF_NetRecoverySummaryByQuarter,
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
