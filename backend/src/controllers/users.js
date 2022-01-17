const Model = require("../models/users.js");
const what = { single: 'user', plural: 'users' };

/**
 * Checks to see if a user access a route based on the allowedRole.
 *
 * @param {object}  request The request object, which should have the user capability via the fastify-roles plugin.
 * @param {string}  allowedRole Is the name of the role that is required to access the route.
 *
 * @returns {boolean}
 */
const userCan = (request, allowedRole) => {
  const capability = request?.user?.capability || [];
  return capability.includes(allowedRole);
}

/**
 * This is a helper function that returns 401 with generic message if user is not allowed to access route.
 *
 * @param   {object}  reply  The reply object, in order to set the status code.
 *
 * @return  {object}
 */
const notAllowed = (reply) => {
  reply.code(401);
  return {message: `You don't have the correct permission`};
}

/**
 * For roles that might require only if mine, however this still needs to be implemented.
 *
 * @param   {object}  request  The request object
 * @todo  Add functionality to call db to see if the owner is the current user.
 *
 * @return  {boolean}
 */
const checkMine = (request) => {
  return true;
}

/**
 * Get all items.
 * 
 * @returns {Object}
 */
const getAll = async (request, reply) => {
  if (userCan(request, 'users_read_all')) {
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
    return notAllowed(reply);
  }
}

/**
 * Get a specific item by ID.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const getOne = async (request, reply) => {
  if (
  userCan(request, 'users_read_all') ||
  (userCan(request, 'users_read_mine') && checkMine(request))
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
    return notAllowed(reply);
  }
  
}

/**
 * Add an item based on request body info.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const addOne = async (request, reply) => {
  if (
    userCan(request, 'users_create_all') ||
    userCan(request, 'users_create_mine')
  ) {
    const target = {
      name: request.body.name
    }
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
    return notAllowed(reply);
  }

}

/**
 * Update an item by ID. Use passed info from the request body.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const updateOne = async (request, reply) => {
  if (
    userCan(request, 'users_update_all') ||
    (userCan(request, 'users_update_mine') && checkMine(request))
  ){
    const target = {
      id: Number(request.params.id),
      name: request.body.name
    }
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
    return notAllowed(reply);
  }

}

/**
 * Delete a user by user ID.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const deleteOne = async (request, reply) => {
  if (userCan(request, 'users_delete_all')){
    const target = {
      id: Number(request.params.id),
    }
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
    return notAllowed(reply);
  }
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
}
