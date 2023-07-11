const controller = require("@controllers/reports");
const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/budget-summary`,
    handler: controller.getReport,
    preHandler: controller.getProjectBudgetReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-quarterly-review`,
    handler: controller.getReport,
    preHandler: controller.getProjectQuarterlyReviewReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-status-report`,
    handler: controller.getReport,
    preHandler: controller.getProjectStatusReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-status-summary`,
    handler: controller.getReport,
    preHandler: controller.getProjectStatusSummaryReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-quarterly-billing-request`,
    handler: controller.getReport,
    preHandler: controller.getProjectQuarterlyBillingReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/project-dashboard`,
    handler: controller.getProjectDashboardReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/active-projects`,
    handler: controller.getActiveProjectsReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/project-lessons-learned`,
    handler: controller.getProjectLessonsLearnedReportOnRequest,
    config: {
      role: "PMO-Reports-Capability",
    },
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
