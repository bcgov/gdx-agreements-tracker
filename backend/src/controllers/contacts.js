const log = require("../facilities/logging.js")(module.filename);
const Model = require("../models/contacts.js");
const what = { plural: "contacts" };

/**
 * Checks to see if a user access a route based on the allowedRole.
 *
 * @param {FastifyRequest}  request    The request object, which should have the user capability via the fastify-roles plugin.
 * @param {string}          capability Is the name of the role that is required to access the route.
 * @returns {boolean}
 */
const userCan = (request, capability) => {
  const userCapabilities = request?.user?.capabilities || [];
  return userCapabilities.includes(capability);
};

/**
 * This is a helper function that returns 401 with generic message if user is not allowed to access route.
 *
 * @param   {FastifyReply}  reply  The reply object, in order to set the status code.
 * @returns  {object}
 */
const notAllowed = (reply) => {
  reply.code(401);
  return { message: `You don't have the correct permission` };
};

/**
 * Get all items.
 *
 * @param   {FastifyRequest}  request  FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}    reply    FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  if (userCan(request, "contacts_read_all")) {
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
    log.trace('user lacks capability "contacts_read_all"');
    return notAllowed(reply);
  }
};

module.exports = {
  getAll,
};
