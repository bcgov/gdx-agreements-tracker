const log = require("../facilities/logging.js")(module.filename);

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
  reply.code(404);
  log.warn(message);
  return { message };
};

/**
 * This simply adds the capability object to the request object, so that the hook in the fastify plugin can have access to this information.
 *
 * @param {FastifyRequest} request    FastifyRequest is an instance of the standard http or http2 request objects.
 * @param {object}         what       The type of object to be accessed.
 * @param {string}         capability The capability it requires to have access.
 */
const userRequires = (request, what, capability) => {
  request.capability = {
    requires: capability,
    what: what,
  };
};

module.exports = {
  failedQuery,
  noQuery,
  userRequires,
};
