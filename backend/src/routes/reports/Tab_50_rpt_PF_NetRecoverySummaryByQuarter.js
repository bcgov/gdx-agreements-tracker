const getControllerFrom = require("@controllers/reports/genericReportController");
const { getAll } = require("@validators/report/tab50");
const controller = getControllerFrom();

module.exports = {
  registerRoutes: (fastify, options, done) => {
    fastify.route({
      method: "GET",
      url: `/report/:type`,
      schema: getAll,
      onRequest: controller.reportHandler,
      handler: controller.getReport,
    });
    done();
  },
};
