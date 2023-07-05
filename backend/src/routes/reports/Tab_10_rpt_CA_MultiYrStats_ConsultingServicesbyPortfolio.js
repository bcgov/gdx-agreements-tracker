const controller = require("@controllers/reports/Tab_10_rpt_CA_MultiYrStats_ConsultingServicesbyPortfolio.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_10_rpt_CA_MultiYrStats_ConsultingServicesbyPortfolio`,
    schema: getReport,
    onRequest: controller.Tab_10_rpt_CA_MultiYrStats_ConsultingServicesbyPortfolio,
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
