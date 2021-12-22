const User = require("../models/user.js");
const what = { single: 'user', plural: 'users' };

/**
 * Get all users.
 * 
 * @returns {Object}
 */
const getAll = async (request, reply) => {
  try {
    const result = await User.find();
    if (!result) {
      return [];
    }
    return result;
  } catch (err) {
    reply.code(500);
    return { message: `There was a problem looking up ${what.plural}.` };
  }
}

/**
 * Get a specific user by ID.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const getUser = async (request, reply) => {
  const targetId = Number(request.params.id);
  try {
    const result = await User.findById(targetId);
    console.log("getuser", result);
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
}

/**
 * Add a user based on request body info.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const addUser = async (request, reply) => {
  const target = {
      name: request.body.name
  }
  try {
    const result = await User.add(target);
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
}

/**
 * Update a user by ID. Use passed info from the request body.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const updateUser = async (request, reply) => {
  const target = {
      id: Number(request.params.id),
      name: request.body.name
  }
  try {
    const result = await User.update(target);
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
}

/**
 * Delete a user by user ID.
 *
 * @param request
 * @param reply
 * @returns {Object}
 */
const deleteUser = async (request, reply) => {
  const target = {
    id: Number(request.params.id),
    name: request.body.name
  }
  try {
    const result = await User.remove(target);
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
}

module.exports = {
    getAll,
    getUser,
    addUser,
    updateUser,
    deleteUser
}
