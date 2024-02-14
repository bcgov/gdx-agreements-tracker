const controller = require("@controllers/projects/contacts");
const validators = require("@validators/projects/contacts");
const what = "contacts";

const routes = [
  {
    method: "GET",
    url: `/projects/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAllByParentId,
  },
  {
    method: "PUT",
    url: `/projects/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateContacts,
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
