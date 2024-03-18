const controller = require("@controllers/projects/project_status");
const validators = require("@validators/projects/project_status");
const what = "status";

const routes = [
  {
    method: "GET",
    url: `/projects/:id/${what}`,
    schema: validators.getAll,
    handler: controller.findAllByProject,
  },
  {
    method: "GET",
    url: `/projects/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/projects/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
    config: {
      role: "PMO-Manager-Edit-Capability",
    },
  },
  {
    method: "POST",
    url: `/projects/${what}`,
    // schema: validators.addOne,
    handler: controller.addOne,
    config: {
      role: "PMO-Manager-Edit-Capability",
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
