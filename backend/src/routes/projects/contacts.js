const controller = require("@controllers/projects/contacts");
const validators = require("@validators/projects/contacts");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/contacts`,
    schema: validators.getAll,
    handler: controller.getAllByParentId,
  },
  {
    method: "PUT",
    url: `/${what}/:id/contacts`,
    schema: validators.updateOne,
    handler: controller.updateOne,
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
