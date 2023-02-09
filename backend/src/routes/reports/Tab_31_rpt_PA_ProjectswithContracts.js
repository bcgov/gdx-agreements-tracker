const controller = require("@controllers/reports/Tab_31_rpt_PA_ProjectswithContracts.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_31_rpt_PA_ProjectswithContracts`,
    onRequest: controller.Tab_31_rpt_PA_ProjectswithContracts,
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
