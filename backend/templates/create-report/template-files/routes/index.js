const getControllerFrom = require("@controllers/reports/genericReportController");
// const validators = require("@validators/report");

const name = `$reportName`;
const controller = getControllerFrom(name);

module.exports = {
  registerRoutes: (fastify, options, done) => {
    fastify.route({
      method: "GET",
      url: `/report/projects/${name}`,
      // schema: getAll,
      onRequest: controller[name],
      handler: controller.getReport,
    });
    done();
  },
};
