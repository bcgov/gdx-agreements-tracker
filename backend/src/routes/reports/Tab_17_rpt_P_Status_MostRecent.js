const controller = require("@controllers/reports/Tab_17_rpt_P_Status_MostRecent.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_17_rpt_P_Status_MostRecent`,
    schema: getReport,
    preHandler: controller.Tab_17_rpt_P_Status_MostRecent,
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
