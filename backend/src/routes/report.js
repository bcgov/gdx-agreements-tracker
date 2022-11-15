const controller = require("../controllers/report");
const validators = require("../validators/report");
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
    url: `/${what}/projects/:id/budgetsummary`,
    handler: controller.getReport,
    onRequest: controller.getProjectBudgetReportOnRequest,
    //handler: controller.getProjectBudgetReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/ProjectQuarterlyReport`,
    handler: controller.getProjectQuarterlyReport,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/ProjectStatusReport`,
    handler: controller.getReport,
    onRequest: controller.getProjectStatusReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-status-summary`,
    handler: controller.getProjectStatusReport,
    onRequest: controller.getProjectStatusSummaryReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-quarterly-billing-request`,
    handler: controller.getProjectStatusReport,
    onRequest: controller.getProjectQuarterlyBillingReportOnRequest,
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
