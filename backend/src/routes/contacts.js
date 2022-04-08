const controller = require("../controllers/contacts");
const what = "contacts";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
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
