const controller = require("../controllers/invoice_resources");
const validators = require("../validators/invoice_resources");

const routes = [
  {
    method: "GET",
    url: `/invoices/:id/resources`,
    schema: validators.getAll,
    handler: controller.getAllByInvoiceId,
  },
  {
    method: "GET",
    url: `/invoices/resources/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/invoices/resources/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/invoices/:id/resources`,
    schema: validators.addOne,
    handler: controller.addOneWithInvoiceId,
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
