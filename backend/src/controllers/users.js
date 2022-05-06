const log = require("../facilities/logging.js")(module.filename);
const Model = require("../models/users.js");
const what = { single: "user", plural: "users" };

/**
 * Checks to see if a user access a route based on the allowedRole.
 *
 * @param   {FastifyRequest} request    The request object, which should have the user capability via the fastify-roles plugin.
 * @param   {string}         capability Is the name of the role that is required to access the route.
 * @returns {boolean}
 */
const userCan = (request, capability) => {
  const userCapabilities = request?.user?.capabilities || [];
  return userCapabilities.includes(capability);
};

/**
 * This is a helper function that returns 401 with generic message if user is not allowed to access route.
 *
 * @param   {FastifyReply} reply The reply object, in order to set the status code.
 * @returns {object}
 */
const notAllowed = (reply) => {
  reply.code(401);
  return { message: `You don't have the correct permission` };
};

/**
 * For roles that might require only if mine, however this still needs to be implemented.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @todo  Add functionality to call db to see if the owner is the current user.
 * @returns {boolean}
 */
const checkMine = (request) => {
  return true;
};

/**
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  if (userCan(request, "users_read_all")) {
    try {
      const result = await Model.findAll();
      if (!result) {
        return [];
      }
      return result;
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem looking up ${what.plural}.` };
    }
  } else {
    log.trace('user lacks capability "users_read_all"');
    return notAllowed(reply);
  }
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getOne = async (request, reply) => {
  if (
    userCan(request, "users_read_all") ||
    (userCan(request, "users_read_mine") && checkMine(request))
  ) {
    const targetId = Number(request.params.id);
    try {
      const result = await Model.findById(targetId);
      if (!result || !result.length) {
        reply.code(404);
        return { message: `The ${what.single} with the specified id does not exist.` };
      } else {
        return result[0];
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem looking up this ${what.single}.` };
    }
  } else {
    log.trace('user lacks capability "users_read_all" || "users_read_mine"');
    return notAllowed(reply);
  }
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
    const target = {
      name: request.body.name,
    };
    try {
      const result = await Model.addOne(target);
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
  if (
    userCan(request, "users_update_all") ||
    (userCan(request, "users_update_mine") && checkMine(request))
  ) {
    const target = {
      id: Number(request.params.id),
      name: request.body.name,
    };
    try {
      const result = await Model.updateOne(target);
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
