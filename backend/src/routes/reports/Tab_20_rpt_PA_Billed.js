const controller = require("@controllers/reports/Tab_20_rpt_PA_Billed.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_20_rpt_PA_Billed`,
    schema: getReport,
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
