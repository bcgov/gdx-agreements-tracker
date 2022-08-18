const controller = require("../controllers/project_status");
const validators = require("../validators/project_status");
const what = "project_status";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOneValidator,
    handler: controller.getOne,
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
