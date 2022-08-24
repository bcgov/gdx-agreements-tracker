const log = require("../facilities/logging.js")(module.filename);
const { getRealmRoles } = require("../facilities/keycloak");

/**
 * This is a helper function that returns 401 with generic message if user is not allowed to access route.
 *
 * @param   {FastifyReply} reply The reply object, in order to set the status code.
 * @param   {object}       what  The type of model being accessed
 * @returns {object}
 */
const notAllowed = (reply, what) => {
  reply.code(401);
  return { message: `You don't have the correct permission to access ${what.plural}` };
};

/**
 * This is the callback for when a query fails, due to an improper syntax.
 *
 * @param   {FastifyReply} reply FastifyReply is an instance of the standard http or http2 reply types.
 * @param   {object}       error The error that gets generated from failed query.
 * @param   {object}       what  The type of model being accessed
 * @returns {object}
 */
const failedQuery = (reply, error, what) => {
  reply.code(500);
  log.error(error);

  return { message: `There was a problem with the query for ${what.plural}.` };
};

/**
 * This is the callback for when the query was successful, but had no results.
 *
 * @param   {FastifyReply} reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @param   {string}       message The no query message.
 * @returns {object}
 */
const noQuery = (reply, message) => {
  reply.code(401);
  log.warn(message);
  return { message };
};

/**
 * Checks to see if a user access a route based on the allowedRole.
 *
 * @param   {FastifyRequest} request    The request object, which should have the user capability via the fastify-roles plugin.
 * @param   {FastifyReply}   reply      FastifyReply is an instance of the standard http or http2 reply types.
 * @param   {object}         what       The type of model being accessed
 * @param   {string}         capability Is the name of the role that is required to access the route.
 * @returns {boolean|string}
 */
const userCan = async (request, reply, what, capability) => {
  let isSysAdmin = false;
  let userCan = false;
  try {
    if ("user" === what.single) {
      const userRealmRoles = getRealmRoles(request);
      isSysAdmin = userRealmRoles.includes("pmo-sys-admin");
    }
    const userCapabilities = request?.user?.capabilities || [];
    userCan = userCapabilities.includes(capability) || isSysAdmin;
    if (!userCan) {
      log.trace(`${what.singular} lacks capability ${capability}`);
      userCan = notAllowed(reply, what);
    }
  } catch (error) {
    log.warn(error);
  }
  return userCan;
};

module.exports = {
  notAllowed,
  userCan,
  failedQuery,
  noQuery,
};
