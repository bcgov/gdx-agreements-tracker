const controller = require("../controllers/invoices");
const validators = require("../validators/invoices");
const what = "invoices";

const routes = [
  {
    method: "GET",
    url: `/contracts/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    //schema: validators.getOne,
    handler: controller.getOne,
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
