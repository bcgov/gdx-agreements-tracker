const controller = require("@controllers/contracts");
const validators = require("@validators/contracts");
const what = "contracts";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    schema: validators.getAll,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOneWithSubcontractors,
  },
  {
    method: "GET",
    url: `/contracts/:id/budgets`,
    // schema: validators.getOne,
    handler: controller.budgetsByFiscal,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    //TODO resolve the trailing slash for creating new contract route
    url: `/${what}/`,
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
