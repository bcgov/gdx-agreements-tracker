const useController = require("./useController/index.js");
const model = require("../models/projects");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);

/**
 * Get a specific project's lessons learned data.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getLessonsLearned = async (request, reply) => {
  controller.userRequires(request, what, "projects_read_all");
  let output;
  const targetId = Number(request.params.id);
  try {
    const result = await model.findProjectLessonsLearned(targetId);
    output = !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Get a specific project's lessons learned data.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getLessonsLearnedById = async (request, reply) => {
  controller.userRequires(request, what, "projects_read_all");
  let output;
  const lessonsLearnedId = Number(request.params.lessonsLearnedId);
  try {
    const result = await model.findLessonsLearnedById(lessonsLearnedId);
    output = !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Get a specific project's lessons learned data.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.updateLessonsLearnedById = async (request, reply) => {
  controller.userRequires(request, what, "projects_update_one");
  let output;
  const lessonsLearnedId = Number(request.params.lessonsLearnedId);
  try {
    const result = await model.updateOneProjectLessonsLearned(request.body, lessonsLearnedId);
    output = !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Get a specific project's lessons learned data.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.addLessonsLearned = async (request, reply) => {
  controller.userRequires(request, what, "project_lessons_add_one");
  let output;
  try {
    const result = await model.addOneProjectLessonsLearned(request.body);
    output = !result ? controller.noQuery(reply, `Couldn't add a lesson learned.`) : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }
  return output;
};

module.exports = controller;
