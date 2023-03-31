const controller = require("@controllers/db_lock");
const what = "db_lock";

const routes = [
  {
    method: "POST",
    url: `/${what}`,
    // schema: validators.addOne,
    handler: controller.addLockByParams,
  },
  {
    method: "GET",
    url: `/${what}`,
    // schema: validators.getOne,
    handler: controller.getLockByParams,
  },
  {
    method: "DELETE",
    url: `/${what}/:id`,
    // schema: validators.addOne,
    handler: controller.deleteLockByParams,
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
