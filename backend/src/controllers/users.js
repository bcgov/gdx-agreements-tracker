const Model = require("../models/users.js");
const what = { single: "user", plural: "users" };
const { failedQuery, noQuery, userRequires } = require("./admin_form");

/**
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  userRequires(request, what, "users_read_all");
  let output;
  try {
    const result = await Model.findAll();
    output = !result
      ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
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
  userRequires(request, what, "users_read_all");
  let output;
  const targetId = Number(request.params.id);
  try {
    const result = await Model.findById(targetId);
    output =
      !result || !result.length
        ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
        : result[0];
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Add an item based on request body info.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const addOne = async (request, reply) => {
  userRequires(request, what, "users_create_all");
  let output;
  try {
    const result = await Model.addOne(request.body);
    output = result || noQuery(reply, `The ${what.single} could not be added.`);
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
  userRequires(request, what, "users_create_all");
  let output;
  try {
    const result = await Model.updateOne(Number(request.params.id), request.body);
    output = result || noQuery(reply, `The ${what.single} could not be updated.`);
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Delete a user by user ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const deleteOne = async (request, reply) => {
  userRequires(request, what, "users_delete_all");
  let output;
  const target = {
    id: Number(request.params.id),
  };
  try {
    const result = await Model.removeOne(target);
    output =
      result || noQuery(reply, `The ${what.single} ${request.params.id} could not be deleted.`);
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
