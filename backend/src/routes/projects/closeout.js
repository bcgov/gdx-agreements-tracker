const controller = require("../../controllers/projects/closeout.js");
const validators = require("../../validators/projects");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/close-out`,
    schema: validators.getOneCloseOut,
    handler: controller.getOne,
  },
  {
    method: "POST",
    url: `/${what}/:id/close-out/notify`,
    handler: controller.notifyCloseOut,
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
