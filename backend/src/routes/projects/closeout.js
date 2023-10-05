const controller = require("@controllers/projects/closeout");
const validators = require("@validators/projects/closeout");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/close-out`,
    schema: validators.getOneById,
    handler: controller.getOneById,
    config: { role: "PMO-Manager-Edit-Capability" },
  },
  {
    method: "POST",
    url: `/${what}/:id/close-out/notify`,
    handler: controller.notify,
    config: { role: "PMO-Manager-Edit-Capability" },
  },
];

const registerRoutes = (fastify, options, done) => {
  routes.forEach((route) => fastify.route(route));
  done();
};

module.exports = { registerRoutes };
