const controller = require("../controllers/ches");
// const validators = require("../validators/journal_voucher");

const routes = [
  {
    method: "GET",
    url: `/ches/health`,
    // schema: validators.getAll,
    handler: controller.getHealth,
  } 
];

const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => fastify.route(route));
  done();
};

module.exports = {
  registerRoutes,
};
