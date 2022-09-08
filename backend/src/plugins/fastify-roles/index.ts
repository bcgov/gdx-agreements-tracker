"use strict";

import fp from "fastify-plugin";
import keycloak from "../../facilities/keycloak";
const { getUserInfo, getRealmRoles } = keycloak();
/**
 * Fastify Roles plugin, that inserts user object into the request object for each api call.
 *
 * @param {FastifyInstance}      fastify The fastify instance.
 * @param {FastifyPluginOptions} opts    Fastify Plugin Options.
 * @todo Add tests after feature is more stable.
 */
const fastifyRoles = async (fastify:any, opts:any) => {
  opts = opts || {};
  //let capability = []
  let user = {};

  /**
   * Fastify hook for onRequest, which basically gets the role from the user, and assigns capabilities.
   *
   * @param {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   */

  const onRequest = async (request:any, reply:any) => {
    return await getUserInfo(request).then((user: any) => {
      if (user) {
        return request.user;
      }
    });
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
  const preSerialization = (request:any, reply:any, payload:any, done:any) => {
    const err = null;
    payload = {
      data: payload,
      user,
    };
    // Only perform this for new style of userCan, by using userRequires function in model.
    if (request.capability) {
      if (!userCan(user, request)) {
        reply.code(401);
        payload.data = {
          message: `Don't have the correct permission for ${request?.capability?.what?.plural}, lacks capability ${request?.capability?.requires}`,
        };
      }
    }

    done(err, payload);
  };

  /**
   * This determines if the user has the role, that is required to complete the task.
   *
   * @param   {object}         user    The user with roles and capabilities.
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @returns {boolean}
   */
  const userCan = (user:any, request:any) => {
    let isSysAdmin = false;
    let userCan = false;
    const userCapabilities = user?.capabilities || [];
    if ("user" === request.capability?.what?.single) {
      const userRealmRoles = getRealmRoles(request);
      isSysAdmin = userRealmRoles.includes("pmo-sys-admin");
    }
    userCan = userCapabilities.includes(request?.capability?.requires) || isSysAdmin;
    return userCan;
  };

  fastify.addHook("preSerialization", preSerialization);
  fastify.addHook("onRequest", onRequest);
};

export default fp(fastifyRoles, {
  fastify: "3.x",
  name: "fastify-roles",
});
