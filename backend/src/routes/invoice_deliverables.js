const controller = require("../controllers/invoice_deliverables");
const validators = require("../validators/invoice_deliverables");

const routes = [
  {
    method: "GET",
    url: `/invoices/:id/deliverables`,
    schema: validators.getAll,
    handler: controller.getAllByInvoiceId,
  },
  {
    method: "GET",
    url: `/invoices/deliverables/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/invoices/deliverables/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/invoices/:id/deliverables`,
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
