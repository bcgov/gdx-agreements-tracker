const controller = require("../controllers/invoice_details");
const validators = require("../validators/invoice_details");

const routes = [
  {
    method: "GET",
    url: `/invoices/:id/resources`,
    schema: validators.getResources,
    handler: controller.getResourcesByInvoiceId,
  },
  {
    method: "GET",
    url: `/invoices/:id/deliverables`,
    schema: validators.getDeliverables,
    handler: controller.getDeliverablesByInvoiceId,
  },
  {
    method: "GET",
    url: `/invoices/resources/:id`,
    schema: validators.getOneResource,
    handler: controller.getResourceById,
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
