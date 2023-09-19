const controller = require("@controllers/projects/closeout");
const validators = require("@validators/projects/closeout");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/close-out`,
    schema: validators.getOneById,
    handler: controller.getOneById,
  },
  {
    method: "POST",
    url: `/${what}/:id/close-out/notify`,
    handler: controller.notify,
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
