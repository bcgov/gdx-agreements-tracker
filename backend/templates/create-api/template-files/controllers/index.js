const log = require("../facilities/logging.js")(module.filename);
const Model = require("../models/$databaseTableName.js");
const what = { plural: $databaseTableName };

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
 * Get all items.
 *
 * @returns {Object}
 */
const getAll = async (request, reply) => {
  if (userCan(request, "$databaseTableName_read_all")) {
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
    log.trace('user lacks capability "$databaseTableName_read_all"');
    return notAllowed(reply);
  }
};

module.exports = {
  getAll,
};
