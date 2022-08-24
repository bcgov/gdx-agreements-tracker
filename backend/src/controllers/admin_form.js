const log = require("../facilities/logging.js")(module.filename);
const { getUserInfo } = require("../facilities/keycloak");

/**
 * This is a helper function that returns 401 with generic message if user is not allowed to access route.
 *
 * @param   {FastifyReply} reply The reply object, in order to set the status code.
 * @returns {object}
 */
 const notAllowed = (reply, what) => {
  reply.code(401);
  return { message: `You don't have the correct permission to access ${what.plural}` };
};


const failedQuery = (reply, error, what) => {
  reply.code(500);
  log.error(error);
  return {message: `There was a problem looking up ${what.plural}.`};
}

/**
 * Checks to see if a user access a route based on the allowedRole.
 *
 * @param   {FastifyRequest} request    The request object, which should have the user capability via the fastify-roles plugin.
 * @param   {string}         capability Is the name of the role that is required to access the route.
 * @returns {boolean}
 */
 const userCan = async (request, reply, what, capability) => {
  let is_sys_admin = false;
  if ("user" === what.single) {
    const user = await getUserInfo(request);
    is_sys_admin = user?.roles.includes('pmo-sys-admin')
  }
  
  const userCapabilities = request?.user?.capabilities || [];
  let userCan = userCapabilities.includes(capability) || is_sys_admin
  if (!userCan){
    log.trace(`${what.singular} lacks capability ${capability}`);
    userCan = notAllowed(reply, what);
  }
  console.log(userCan)
  return userCan ;
};


module.exports = {
  notAllowed,
  userCan,
  failedQuery
}