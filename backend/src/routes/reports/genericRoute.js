const getControllerFrom = require("@controllers/reports/genericReportController");
const { getReport } = require("@validators/report/index.js");
const controller = getControllerFrom();

module.exports = {
  registerRoutes: (fastify, options, done) => {
    fastify.route({
      method: "GET",
      url: `/report/:type`,
      schema: getReport,
      preHandler: controller.reportHandler,
      handler: controller.getReport,
      config: {
        role: "PMO-Reports-Capability",
      },
    });
    done();
  },
};
