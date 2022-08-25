const Model = require("../models/projects.js");
const what = { single: "project", plural: "projects" };
const { failedQuery, noQuery, userRequires } = require("./admin_form");

/**
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  userRequires(request, what, "projects_read_all");
  let output;
  try {
    const result = await Model.findAll();
    output = !result ? noQuery(reply, `There was a problem looking up ${what.plural}.`) : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getOne = async (request, reply) => {
  userRequires(request, what, "projects_read_all");
  let output;
  const targetId = Number(request.params.projectId);
  try {
    const result = await Model.findById(targetId);
    output =
      !result || !result.length
        ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
        : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Get a specific project's close out data.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getCloseOut = async (request, reply) => {
  userRequires(request, what, "projects_read_all");
  let output;
  const targetId = Number(request.params.projectId);
  try {
    const result = await Model.findCloseOutById(targetId);
    output = !result
      ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Update an item by ID. Use passed info from the request body.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const updateOne = async (request, reply) => {
  userRequires(request, what, "projects_update_all");
  let output;
  try {
    const result = await Model.updateOne(request.body, request.params.id);
    output = !result ? noQuery(reply, `The ${what.single} could not be updated.`) : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

module.exports = {
  getAll,
  getOne,
  getCloseOut,
  updateOne,
};
