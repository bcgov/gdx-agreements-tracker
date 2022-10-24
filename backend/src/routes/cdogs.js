const controller = require("../controllers/cdogs");
// const validators = require("../validators/journal_voucher");

const routes = [
  {
    method: "GET",
    url: `/cdogs/health`,
    // schema: validators.getAll,
    handler: controller.getHealth,
  },
  {
    method: "GET",
    url: `/cdogs/fileTypes`,
    handler: controller.getFileTypes,
  },
  {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    url: `/cdogs/template/render`,
    handler: controller.renderReport,
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
