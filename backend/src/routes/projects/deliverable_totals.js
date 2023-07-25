const controller = require("@controllers/projects/deliverable_totals");
const validators = require("@validators/projects/deliverable_totals");

const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/deliverables/totalsByFiscal`,
    schema: validators.getAllByFiscal,
    handler: controller.getProjectDeliverableTotalsByFiscal,
  },
  {
    method: "GET",
    url: `/${what}/:id/deliverables/totals`,
    schema: validators.getAll,
    handler: controller.getProjectDeliverableTotals,
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
