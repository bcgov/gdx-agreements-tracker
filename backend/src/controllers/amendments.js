const log = require("../facilities/logging.js")(module.filename);
const Model = require("../models/amendments.js");
const what = { single: "amendment", plural: "amendments" };

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
 * @param   {FastifyRequest} request The request object
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
  const contractId = Number(request.params.contractId);
  if (userCan(request, "amendments_read_all")) {
    try {
      const result = await Model.findAll(contractId);
      if (!result) {
        return [];
      }
      return result;
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem looking up ${what.plural}.` };
    }
  } else {
    log.trace('user lacks capability "amendments_read_all"');
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
    userCan(request, "amendments_read_all") ||
    (userCan(request, "amendments_read_mine") && checkMine(request))
  ) {
    const contractId = Number(request.params.contractId);
    const amendmentId = Number(request.params.amendmentId);
    try {
      const result = await Model.findById(Number(contractId), Number(amendmentId));
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
    log.trace('user lacks capability "amendments_read_all" || "amendments_read_mine"');
    return notAllowed(reply);
  }
};

const updateOne = async (request, reply) => {
  if (
    userCan(request, "amendments_read_all") ||
    (userCan(request, "amendments_read_mine") && checkMine(request))
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
    log.trace('user lacks capability "amendments_read_all" || "amendments_read_mine"');
    return notAllowed(reply);
  }
};

module.exports = {
  getAll,
  getOne,
  updateOne
};
