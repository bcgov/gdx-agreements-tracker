const controller = require("../controllers/report");
const validators = require("../validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/:projectId`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "GET",
    url: `/${what}/projects/ProjectBudgetReport`,
    schema: validators.getOne,
    handler: controller.getProjectBudgetReport,
  },
  {
    method: "GET",
    url: `/${what}/projects/ProjectQuarterlyReport`,
    schema: validators.getOne,
    handler: controller.getProjectQuarterlyReport,
  },
  {
    method: "GET",
    url: `/${what}/projects/ProjectStatusReport`,
    schema: validators.getOne,
    handler: controller.getProjectStatusReport,
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
