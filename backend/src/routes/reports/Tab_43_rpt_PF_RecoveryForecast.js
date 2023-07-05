const controller = require("@controllers/reports/Tab_43_rpt_PF_RecoveryForecast.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_43_rpt_PF_RecoveryForecast`,
    schema: getReport,
    onRequest: controller.Tab_43_rpt_PF_RecoveryForecast,
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
