const controller = require("@controllers/projects/lessonsLearned");
const validators = require("@validators/projects");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/lessons-learned`,
    schema: validators.getAllLessonsLearned,
    handler: controller.getAllByParentId,
  },
  {
    method: "GET",
    url: `/${what}/:projectId/lessons-learned/:id`,
    schema: validators.getLessonsLearnedById,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:projectId/lessons-learned/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
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
