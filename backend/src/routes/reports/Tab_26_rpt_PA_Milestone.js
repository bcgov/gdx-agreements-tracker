const controller = require("@controllers/reports/Tab_26_rpt_PA_Milestone.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_26_rpt_PA_Milestone`,
    onRequest: controller.Tab_26_rpt_PA_Milestone,
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
