const controller = require("../controllers/projects");
const projectContactsController = require("../controllers/projects/contacts");
const validators = require("../validators/projects");
const projectContactsValidators = require("../validators/projects/contacts");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/contacts`,
    schema: projectContactsValidators.getAll,
    handler: projectContactsController.getAllByParentId,
  },
  {
    method: "PUT",
    url: `/${what}/:id/contacts`,
    schema: projectContactsValidators.updateOne,
    handler: projectContactsController.updateOne,
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
