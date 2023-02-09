const controller = require("@controllers/reports");
const validators = require("@validators/report");
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
    url: `/${what}/projects/:id/budget-summary`,
    handler: controller.getReport,
    onRequest: controller.getProjectBudgetReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-quarterly-review`,
    handler: controller.getReport,
    onRequest: controller.getProjectQuarterlyReviewReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-status-report`,
    handler: controller.getReport,
    onRequest: controller.getProjectStatusReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-status-summary`,
    handler: controller.getReport,
    onRequest: controller.getProjectStatusSummaryReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-quarterly-billing-request`,
    handler: controller.getReport,
    onRequest: controller.getProjectQuarterlyBillingReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/project-dashboard`,
    handler: controller.getProjectDashboardReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/active-projects`,
    handler: controller.getReport,
    onRequest: controller.getActiveProjectsReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/project-lessons-learned`,
    handler: controller.getProjectLessonsLearnedReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/contract-summary`,
    handler: controller.getContractSummaryReportOnRequest,
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
