const controller = require("@controllers/reports/Tab_24_rpt_PA_Gantt.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_24_rpt_PA_Gantt`,
    onRequest: controller.Tab_24_rpt_PA_Gantt,
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
