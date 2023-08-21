const controller = require("@controllers/contracts/contract_resources");
const validators = require("@validators/contracts/contract_resources");
const what = "resources";

const routes = [
  {
    method: "GET",
    url: `/contracts/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAllById,
  },
  {
    method: "GET",
    url: `/contracts/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/contracts/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/contracts/:id/${what}`,
    schema: validators.addOned,
    handler: controller.addOneWithContractId,
  },
  {
    method: "DELETE",
    url: `/contracts/${what}/:id`,
    schema: validators.deleteOne,
    handler: controller.deleteOne,
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
