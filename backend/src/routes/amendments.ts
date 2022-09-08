const controller = require("../controllers/amendments");
const validators = require("../validators/amendments");
const what = "amendments";

const routes = [
  {
    method: "GET",
    url: `/contracts/:contractId/${what}`,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/contracts/:contractId/${what}/:amendmentId`,
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
