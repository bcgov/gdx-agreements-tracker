const controller = require("../controllers/report");
const validators = require("../validators/report");
const controllerCdogs = require("../controllers/cdogs");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "GET",
    url: `/${what}/projects/ProjectBudgetReport`,
    handler: controller.getProjectBudgetReport,
  },
  {
    method: "GET",
    url: `/${what}/projects/ProjectQuarterlyReport`,
    handler: controller.getProjectQuarterlyReport,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/ProjectStatusReport`,
    handler: controller.getProjectStatusReport,
    onRequest: controller.getProjectStatusReportOnRequest,
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
