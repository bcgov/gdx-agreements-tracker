const controller = require("../controllers/projects");
const validators = require("../validators/projects");
const what = "projects";

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
    handler: controller.getOneWithContracts,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "GET",
    url: `/${what}/:id/close-out`,
    schema: validators.getOneCloseOut,
    handler: controller.getCloseOut,
  },
  {
    method: "POST",
    url: `/${what}/:id/close-out/notify`,
    handler: controller.notifyCloseOut,
  },
  {
    method: "GET",
    url: `/${what}/:id/lessons-learned`,
    handler: controller.getLessonsLearned,
  },
  {
    method: "GET",
    url: `/${what}/:id/lessons-learned/:lessonsLearnedId`,
    schema: validators.getLessonsLearnedById,
    handler: controller.getLessonsLearnedById,
  },
  {
    method: "PUT",
    url: `/${what}/:id/lessons-learned/:lessonsLearnedId`,
    schema: validators.updateOne,
    handler: controller.updateLessonsLearnedById,
  },
  {
    method: "POST",
    url: `/lessons-learned`,
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
