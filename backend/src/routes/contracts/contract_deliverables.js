const controller = require("@controllers/contracts/contract_deliverables");
const validators = require("@validators/contracts/contract_deliverables"); //TODO Coming in next PR
const what = "deliverables";

const routes = [
  {
    method: "GET",
    url: `/contracts/:id/${what}`,
    // schema: validators.getAll,  //TODO Coming in next PR
    handler: controller.getAllById,
  },
  {
    method: "GET",
    url: `/contracts/${what}/:id`,
    // schema: validators.getOne,  //TODO Coming in next PR
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/contracts/${what}/:id`,
    //schema: validators.updateOne, //TODO Coming in next PR
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/contracts/:id/${what}`,
    //schema: validators.addOne, //TODO Coming in next PR
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
