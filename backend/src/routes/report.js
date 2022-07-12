const controller = require("../controllers/report");
const validators = require("../validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/:projectId`,
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
