const controller = require("@controllers/reports/Tab_21_rpt_PA_Billing_Historical.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_21_rpt_PA_Billing_Historical`,
    onRequest: controller.Tab_21_rpt_PA_Billing_Historical,
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
