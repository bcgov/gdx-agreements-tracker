const controller = require("@controllers/reports/Tab_43_rpt_PF_RecoveryForecast.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_43_rpt_PF_RecoveryForecast`,
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
