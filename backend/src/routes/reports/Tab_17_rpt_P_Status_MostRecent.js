const controller = require("@controllers/reports/Tab_17_rpt_P_Status_MostRecent.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_17_rpt_P_Status_MostRecent`,
    onRequest: controller.Tab_17_rpt_P_Status_MostRecent,
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
