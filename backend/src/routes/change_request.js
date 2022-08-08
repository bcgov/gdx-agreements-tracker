const controller = require("../controllers/change_request");
const validators = require("../validators/change_request");
const what = "change_request";

const routes = [
  {
    method: "GET",
    url: `/projects/:projectId/${what}`,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/projects/:projectId/${what}/:changeRequestId`,
    schema: validators.getOneValidator,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/${what}`,
    handler: controller.addOne,
  },
];
const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => {
    fastify.route(route);
  });
  done();
};

module.exports = {
  registerRoutes,
};
