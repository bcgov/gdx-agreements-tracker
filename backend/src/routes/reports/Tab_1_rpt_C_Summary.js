const controller = require("@controllers/reports/Tab_1_rpt_C_Summary.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_1_rpt_C_Summary`,
    onRequest: controller.Tab_1_rpt_C_Summary,
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
