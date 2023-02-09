const controller = require("@controllers/reports/Tab_20_rpt_PA_Billed.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_20_rpt_PA_Billed`,
    onRequest: controller.Tab_20_rpt_PA_Billed,
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
