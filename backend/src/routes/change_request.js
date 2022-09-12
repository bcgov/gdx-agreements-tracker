const controller = require("../controllers/change_request");
const validators = require("../validators/change_request");
const what = "change_request";

const routes = [
  {
    method: "GET",
    url: `/projects/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAllById,
  },
  {
    method: "GET",
    url: `/projects/:projectId/${what}/:changeRequestId`,
    schema: validators.getOne,
    handler: controller.getOneByTwoIds,
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
  routes.forEach((route) => {
    fastify.route(route);
  });
  done();
};

module.exports = {
  registerRoutes,
};
