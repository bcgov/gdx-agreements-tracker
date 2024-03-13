const controller = require("@controllers/projects/lessons_learned");
const validators = require("@validators/projects/lessons_learned");

const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/lessons-learned`,
    schema: validators.getAll,
    handler: controller.getAllByParentId,
  },
  {
    method: "GET",
    url: `/${what}/:projectId/lessons-learned/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:projectId/lessons-learned/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
    config: {
      role: "PMO-Manager-Edit-Capability",
    },
  },
  {
    method: "POST",
    url: `/lessons-learned`,
    schema: validators.addOne,
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
