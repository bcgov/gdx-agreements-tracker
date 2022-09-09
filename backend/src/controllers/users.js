<<<<<<< HEAD
const model = require("../models/users");
const useController = require("./useController/index.js");
=======
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
    output = !result ? noQuery(reply, `The ${what.single} could not be found.`) : result;
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
    output = !result
      ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};
>>>>>>> 2ddb440 (Updated changelog)

const what = { single: "user", plural: "users" };
const controller = useController(model, "users_update_all", what);

module.exports = controller;
