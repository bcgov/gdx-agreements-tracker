const controller = require("../controllers/project_status");
const validators = require("../validators/project_status");
const what = "status";

const routes = [
  {
    method: "GET",
    url: `/projects/:id/${what}`,
    // schema: validators.getAll,
    handler: controller.findAllByProject,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOne,
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
