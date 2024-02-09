const controller = require("@controllers/admin/logs");
// const validators = require("@validators/admin/logs");
const what = "logs";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    // schema: validators.getAll,
    handler: controller.getAll,
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
