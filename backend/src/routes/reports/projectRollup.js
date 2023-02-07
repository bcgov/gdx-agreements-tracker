const controller = require("@controllers/reports/projectRollup.js");
// const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/project-status-roll-up`,
    // handler: controller.getProjectStatusRollup,
    onRequest: controller.getProjectStatusRollup,
    handler: controller.getReport,
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
