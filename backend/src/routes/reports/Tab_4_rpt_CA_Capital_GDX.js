const controller = require("@controllers/reports/Tab_4_rpt_CA_Capital_GDX.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_4_rpt_CA_Capital_GDX`,
    schema: getReport,
    onRequest: controller.Tab_4_rpt_CA_Capital_GDX,
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
