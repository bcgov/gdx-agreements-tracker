const log = require("../facilities/logging.js")(module.filename);
const { Query } = require("pg");
const Model = require("../models/users.js");
const what = { single: "user", plural: "users" };

const { notAllowed, userCan, failedQuery } = require("./admin_form")

/**
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  let output = userCan(request, reply, what, "admin_form_read_all");
  if (output) {
    try {
      const result = await Model.findAll();
      if (!result) {
        output = [];
      }
      output = result;
    } catch (err) {
      output = failedQuery(reply, err, what);
    }
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
  let output = userCan(request, reply, what, "admin_form_read_all");
  if (output) {
    const targetId = Number(request.params.id);
    try {
      const result = await Model.findById(targetId);
      if (!result || !result.length) {
        reply.code(404);
        return {
          message: `The ${what.single} with the specified id does not exist.`,
        };
      } else {
        return result[0];
      }
    } catch (err) {
      output = failedQuery(reply, err, what);
    }
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
  if (userCan(request, "users_create_all") || userCan(request, "users_create_mine")) {
    try {
      const result = await Model.addOne(request.body);
      if (!result) {
        reply.code(403);
        return { message: `The ${what.single} could not be added.` };
      } else {
        return result;
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem adding this ${what.single}.` };
    }
  } else {
    log.trace('user lacks capability "users_create_all" || "users_create_mine"');
    return notAllowed(reply);
  }
};

/**
 * Update an item by ID. Use passed info from the request body.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const updateOne = async (request, reply) => {

  if (userCan(request, "users_update_all") ) {
    const target = {
      id: Number(request.params.id),
      name: request.body.name,
    };
    try {
      const result = await Model.updateOne(Number(request.params.id), request.body);
      if (!result) {
        reply.code(403);
        return { message: `The ${what.single} could not be updated.` };
      } else {
        return result;
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem updating this ${what.single}.` };
    }
  } else {
    log.trace('user lacks capability "users_update_all" || "users_update_mine"');
    return notAllowed(reply);
  }
};

/**
 * Delete a user by user ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const deleteOne = async (request, reply) => {
  if (userCan(request, "users_delete_all")) {
    const target = {
      id: Number(request.params.id),
    };
    try {
      const result = await Model.removeOne(target);
      if (!result) {
        reply.code(403);
        return { message: `The ${what.single} could not be added.` };
      } else {
        return { message: `Deleted ${what.single} with id ${request.params.id}` };
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem deleting this ${what.single}.` };
    }
  } else {
    log.trace('user lacks capability "users_delete_all"');
    return notAllowed(reply);
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
