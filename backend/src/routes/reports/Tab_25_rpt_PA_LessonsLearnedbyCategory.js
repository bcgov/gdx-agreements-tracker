const controller = require("@controllers/reports/Tab_25_rpt_PA_LessonsLearnedbyCategory.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_25_rpt_PA_LessonsLearnedbyCategory`,
    schema: getReport,
    onRequest: controller.Tab_25_rpt_PA_LessonsLearnedbyCategory,
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
