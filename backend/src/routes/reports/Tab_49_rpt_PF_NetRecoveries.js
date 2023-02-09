const controller = require("@controllers/reports/Tab_49_rpt_PF_NetRecoveries.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_49_rpt_PF_NetRecoveries`,
    onRequest: controller.Tab_49_rpt_PF_NetRecoveries,
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
