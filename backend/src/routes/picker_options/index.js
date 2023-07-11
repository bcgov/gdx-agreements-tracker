const controller = require("@controllers/picker_options");
const validators = require("@validators/picker_options");
const what = "picker_options";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    schema: validators.getAll,
    handler: controller.getAll,
    config: {
      role: "PMO-Manager-Edit-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
    config: {
      role: "PMO-Manager-Edit-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/project/:id`,
    schema: validators.getAllById,
    handler: controller.findAllByProject,
    config: {
      role: "PMO-Manager-Edit-Capability",
    },
  },
  {
    method: "GET",
    url: `/${what}/contract/:id`,
    schema: validators.getAllById,
    handler: controller.findAllByContract,
    config: {
      role: "PMO-Manager-Edit-Capability",
    },
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
