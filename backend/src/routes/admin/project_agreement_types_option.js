const controller = require("@controllers/admin/project_agreement_types_option");
const validators = require("@validators/admin/project_agreement_types_option");
const what = "project_agreement_types_option";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    schema: validators.getAll,
    handler: controller.getAll,
    config: {
      role: "PMO-Admin-Edit-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
    config: {
      role: "PMO-Admin-Edit-Capability",
    },
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
    config: {
      role: "PMO-Admin-Edit-Capability",
    },
  },
  {
    method: "POST",
    url: `/${what}`,
    schema: validators.addOne,
    handler: controller.addOne,
    config: {
      role: "PMO-Admin-Edit-Capability",
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
