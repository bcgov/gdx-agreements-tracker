const controller = require("@controllers/reports/Tab_31_rpt_PA_ProjectswithContracts.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_31_rpt_PA_ProjectswithContracts`,
    schema: getReport,
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
