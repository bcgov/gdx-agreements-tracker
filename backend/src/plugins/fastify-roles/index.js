"use strict";

const fp = require("fastify-plugin");
const { getUserInfo } = require("../../facilities/keycloak");

/**
 * Fastify Roles plugin, that inserts user object into the request object for each api call.
 *
 * @param {FastifyInstance}      fastify The fastify instance.
 * @param {FastifyPluginOptions} opts    Fastify Plugin Options.
 * @todo Add tests after feature is more stable.
 */
const fastifyRoles = async (fastify, opts) => {
  opts = opts || {};
  let permission = "none"; // none || read || write
  //let capability = []
  let user = {};

  /**
   * Fastify hook for onRequest, which basically gets the role from the user, and assigns capabilities.
   *
   * @param {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   */
  const onRequest = async (request, reply) => {
    user = await getUserInfo(request);
    if (user) {
      request.user = user;
    }
  };

  /**
   * Fastify hook for preSerialization, which basically is adding permission and capabilities to the payload.
   * It is also putting the payload under data attribute.
   * This might be a temporary hook, but for now, it is informational in the response.
   *
   * @param {FastifyRequest}          request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param {FastifyReply}            reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @param {PreSerializationPayload} payload Data payload.
   * @param {DoneFuncWithErrOrRes}    done    Done function to call to let the asynchronous system know we are done setting up.
   */
  const preSerialization = (request, reply, payload, done) => {
    const err = null;
    payload = {
      data: payload,
      permission,
      user,
    };
    done(err, payload);
  };

  fastify.addHook("preSerialization", preSerialization);
  fastify.addHook("onRequest", onRequest);
};

module.exports = fp(fastifyRoles, {
  fastify: "3.x",
  name: "fastify-roles",
});
