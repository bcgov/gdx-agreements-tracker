const controller = require("../controllers/users");
const validators = require("../validators");
const what = "users";

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
    method: "POST",
    url: `/${what}`,
    handler: controller.addOne,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    handler: controller.updateOne,
  },
  {
    method: "DELETE",
    url: `/${what}/:id`,
    handler: controller.deleteOne,
  },
];

const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => fastify.route(route));
  done();
};

module.exports = {
  userRoutes: registerRoutes,
};
