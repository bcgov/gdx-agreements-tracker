const log = require("../facilities/logging.js")(module.filename);
const Model = require("../models/report.js");
const what = { single: "report", plural: "reports" };

/**
 * Checks to see if a user can access a route based on the allowedRole.
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
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getOne = async (request, reply) => {
  if (userCan(request, "report_read_mine") && checkMine(request)) {
    const projectId = Number(request.params.projectId);
    try {
      const result = await Model.findById(projectId);
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
    log.trace('user lacks capability "report_read_mine"');
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
const getProjectBudgetReport = async (request, reply) => {
  if (userCan(request, "report_read_mine") && checkMine(request)) {
    try {
      const result = await Model.projectBudgetReport();
      if (!result) {
        reply.code(404);
        return { message: `The ${what.single} with the specified id does not exist.` };
      } else {
        return result;
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem looking up this Project Budget Report.` };
    }
  } else {
    log.trace('user lacks capability "report_read_mine"');
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
const getProjectQuarterlyReport = async (request, reply) => {
  if (userCan(request, "report_read_mine") && checkMine(request)) {
    try {
      const result = await Model.projectQuarterlyReport();
      if (!result) {
        reply.code(404);
        return { message: `The ${what.single} with the specified id does not exist.` };
      } else {
        return result;
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem looking up this Project Quarterly Report.` };
    }
  } else {
    log.trace('user lacks capability "report_read_mine"');
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
const getProjectStatusReport = async (request, reply) => {
  if (userCan(request, "report_read_mine") && checkMine(request)) {
    try {
      const result = await Model.projectStatusReport();
      if (!result) {
        reply.code(404);
        return { message: `The ${what.single} with the specified id does not exist.` };
      } else {
        return result;
      }
    } catch (err) {
      reply.code(500);
      return { message: `There was a problem looking up this Project Status Report.` };
    }
  } else {
    log.trace('user lacks capability "report_read_mine"');
    return notAllowed(reply);
  }
};

module.exports = {
  getOne,
  getProjectBudgetReport,
  getProjectQuarterlyReport,
  getProjectStatusReport,
};
