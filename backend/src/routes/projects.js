const controller = require("../controllers/projects");
const validators = require("../validators/projects");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:projectId`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "GET",
    url: `/${what}/:projectId/close-out`,
    schema: validators.getOne,
    handler: controller.getCloseOut,
  },
  {
    method: "POST",
    url: `/${what}/:projectId/close-out/notify`,
    schema: validators.getOne,
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
