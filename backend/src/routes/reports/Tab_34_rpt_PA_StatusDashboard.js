const controller = require("@controllers/reports/Tab_34_rpt_PA_StatusDashboard.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_34_rpt_PA_StatusDashboard`,
    schema: getReport,
    preHandler: controller.Tab_34_rpt_PA_StatusDashboard,
    handler: controller.getReport,
    config: {
      role: "PMO-Reports-Capability",
    },
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
