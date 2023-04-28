const controller = require("@controllers/db_lock");
const what = "db_lock";

const routes = [
  {
    method: "POST",
    url: `/${what}/add`,
    // schema: validators.addOne,
    handler: controller.addLockByParams,
  },
  {
    method: "POST",
    url: `/${what}/get`,
    // schema: validators.getOne,
    handler: controller.getLockByParams,
  },
  {
    method: "POST",
    url: `/${what}/delete`,
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
