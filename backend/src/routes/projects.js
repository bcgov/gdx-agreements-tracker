const controller = require("../controllers/projects");
//const validators = require("../validators/projects");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:projectId`,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    handler: controller.updateOne,
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
