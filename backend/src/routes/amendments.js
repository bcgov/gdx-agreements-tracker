const controller = require("../controllers/amendments");
const validators = require("../validators/amendments");
const what = "amendments";

const routes = [
  {
    method: "GET",
    url: `/contracts/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAllAmendments,
  },
  {
    method: "GET",
    url: `/contracts/:id/${what}/:amendmentId`,
    schema: validators.getOne,
    handler: controller.getContractAmendment,
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
