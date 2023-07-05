const getControllerFrom = require("@controllers/reports/genericReportController");
const { getReport } = require("@validators/report/index.js");
const controller = getControllerFrom();

module.exports = {
  registerRoutes: (fastify, options, done) => {
    fastify.route({
      method: "GET",
      url: `/report/:type`,
      schema: getReport,
      onRequest: controller.reportHandler,
      handler: controller.getReport,
    });
    done();
  },
};
