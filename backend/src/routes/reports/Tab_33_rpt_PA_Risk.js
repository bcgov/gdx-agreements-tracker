const controller = require("@controllers/reports/Tab_33_rpt_PA_Risk.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_33_rpt_PA_Risk`,
    onRequest: controller.Tab_33_rpt_PA_Risk,
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
