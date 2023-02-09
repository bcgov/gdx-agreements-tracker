const controller = require("@controllers/reports/Tab_34_rpt_PA_StatusDashboard.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_34_rpt_PA_StatusDashboard`,
    onRequest: controller.Tab_34_rpt_PA_StatusDashboard,
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
