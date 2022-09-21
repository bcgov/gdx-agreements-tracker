const controller = require("../controllers/cdogs");
// const validators = require("../validators/journal_voucher");

const routes = [
  {
    method: "GET",
    url: `/cdogs/health`,
    // schema: validators.getAll,
    handler: controller.getHealth,
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
