const controller = require("@controllers/admin/glossary");
const validators = require("@validators/admin/glossary");
const what = "glossary";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    schema: validators.getAll,
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
