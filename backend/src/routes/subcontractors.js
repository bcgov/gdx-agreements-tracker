const controller = require("../controllers/subcontractors");
const validators = require("../validators/subcontractors");
const what = "subcontractors";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    schema: controller.getAll,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/${what}`,
    schema: validators.addOne,
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
