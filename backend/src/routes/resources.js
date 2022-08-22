const controller = require("../controllers/resources");
const validators = require("../validators/resources");
const what = "resources";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOneValidator,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/${what}`,
    handler: controller.addOne,
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
