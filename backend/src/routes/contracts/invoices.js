const controller = require("@controllers/contracts/invoices");
const validators = require("@validators/contracts/invoices");
const what = "invoices";

const routes = [
  {
    method: "GET",
    url: `/contracts/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAllByContractId,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "GET",
    url: `/${what}/:id/fiscal`,
    // schema: validators.findFiscalBySelectedRow,
    handler: controller.findFiscalBySelectedRow,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/contracts/:id/${what}`,
    schema: validators.addOne,
    handler: controller.addOneWithContractId,
  },
  {
    method: "DELETE",
    url: `/${what}/:id`,
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
