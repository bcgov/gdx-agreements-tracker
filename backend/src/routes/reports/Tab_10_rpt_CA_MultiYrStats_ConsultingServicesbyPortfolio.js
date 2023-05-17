const controller = require("@controllers/reports/Tab_10_rpt_CA_MultiYrStats_ConsultingServicesbyPortfolio.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/Tab_10_rpt_CA_MultiYrStats_ConsultingServicesbyPortfolio`,
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
