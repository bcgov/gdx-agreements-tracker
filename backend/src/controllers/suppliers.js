const log = require("../facilities/logging.js")(module.filename);
const Model = require("../models/suppliers.js");
const what = { single: "supplier", plural: "suppliers" };

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
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
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
/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getOne = async (request, reply) => {
  if (
    userCan(request, "suppliers_read_all") ||
    (userCan(request, "suppliers_read_mine") && checkMine(request))
  ) {
    const changeRequestId = Number(request.params.changeRequestId);
    const projectId = Number(request.params.projectId);
    try {
      const result = await Model.findById(Number(changeRequestId), Number(projectId));
      if (!result || !result.length) {
        reply.code(404);
        return { message: `The ${what.single} with the specified id does not exist.` };
      } else {
        return result;
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem looking up this ${what.single}.` };
    }
  } else {
    log.trace('user lacks capability "suppliers_read_all" || "suppliers_read_mine"');
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
    userCan(request, "suppliers_update_all") ||
    (userCan(request, "suppliers_update_one") && checkMine(request))
  ) {
    try {
      const result = await Model.updateOne(request.body, request.params.id);
      if (!result) {
        reply.code(403);
        return { message: `The ${what.single} could not be updated.` };
      } else {
        return result;
      }
    } catch (err) {
      reply.code(500);
      console.error("err", err);
      return { message: `There was a problem updating this ${what.single}. Error:${err}` };
    }
  } else {
    log.trace('user lacks capability "suppliers_update_all" || "suppliers_update_mine"');
    return notAllowed(reply);
  }
};

module.exports = {
  getAll,
  getOne,
  updateOne,
};
