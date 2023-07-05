const controller = require("@controllers/reports/Tab_21_rpt_PA_Billing_Historical.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_21_rpt_PA_Billing_Historical`,
    schema: getReport,
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
