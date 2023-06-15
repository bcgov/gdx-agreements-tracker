const getControllerFrom = require("@controllers/reports/genericReportController");
const { getAll } = require("@validators/report/tab50");

const name = `Tab_50_rpt_PF_NetRecoverySummaryByQuarter`;
const controller = getControllerFrom(name);

module.exports = {
  registerRoutes: (fastify, options, done) => {
    fastify.route({
      method: "GET",
      url: `/report/projects/${name}`,
      schema: getAll,
      onRequest: controller[name],
      handler: controller.getReport,
    });
    done();
  },
};
