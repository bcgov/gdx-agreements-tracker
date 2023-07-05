const controller = require("@controllers/reports/Tab_12_rpt_CF_InvoicePaymentsbyPortfolio.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_12_rpt_CF_InvoicePaymentsbyPortfolio`,
    schema: getReport,
    onRequest: controller.Tab_12_rpt_CF_InvoicePaymentsbyPortfolio,
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
