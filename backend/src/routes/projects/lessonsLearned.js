const controller = require("../controllers/projects");
const validators = require("../validators/projects");
const what = "projects";

const routes = [
  {
    method: "GET",
    url: `/${what}/:id/lessons-learned`,
    schema: validators.getAllLessonsLearned,
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
    handler: controller.addLessonsLearned,
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
