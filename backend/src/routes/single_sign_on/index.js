const controller = require("@controllers/single_sign_on/index.js");
const validators = require("@validators/single_sign_on/index.js");

const routes = [
  {
    method: "GET",
    url: `/sso/users`,
    schema: validators.getAll,
    handler: controller.getUsers,
    config: {
      role: "PMO-Admin-Edit-Capability",
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
