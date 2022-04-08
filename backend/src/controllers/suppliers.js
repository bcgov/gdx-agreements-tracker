const log = require("../facilities/logging.js")(module.filename);
const Model = require("../models/suppliers.js");
const what = { single: "supplier", plural: "suppliers" };

/**
 * Checks to see if a user access a route based on the allowedRole.
 *
 * @param {object}  request The request object, which should have the user capability via the fastify-roles plugin.
 * @param {string}  capability Is the name of the role that is required to access the route.
 *
 * @returns {boolean}
 */
const userCan = (request, capability) => {
  const userCapabilities = request?.user?.capabilities || [];
  return userCapabilities.includes(capability);
};

/**
 * This is a helper function that returns 401 with generic message if user is not allowed to access route.
 *
 * @param   {object}  reply  The reply object, in order to set the status code.
 *
 * @return  {object}
 */
const notAllowed = (reply) => {
  reply.code(401);
  return { message: `You don't have the correct permission` };
};

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
};

/**
 * Get all items.
 *
 * @returns {Object}
 */
const getAll = async (request, reply) => {
  if (userCan(request, "suppliers_read_all")) {
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
    log.trace('user lacks capability "suppliers_read_all"');
    return notAllowed(reply);
  }
};

module.exports = {
  getAll,
};
