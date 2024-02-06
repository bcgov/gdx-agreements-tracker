require("dotenv").config({ path: "../.env" });
const allRoutes = require("@routes/index.js");
const { getBearerTokenFromRequest, verifyToken, getRealmRoles } = require("@facilities/keycloak");
const jwksUri = process.env.JWKSURI;
const fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifyAuth = require("@fastify/auth");
const fastifyPayload = require("../plugins/fastifyPayload");
const fastifyDBLogger = require("../plugins/fastifyDBLogger");

/**
 * Verify jWT, to verify auth token, as part of the verifyAuthentication decorator.
 *
 * @param {FastifyRequest} request The fastify request is an instance of the standard http or http2 request objects.
 * @param {FastifyReply}   reply   The fastify reply object.
 */
const verifyJWT = async (request, reply) => {
  request.log.debug("preValidation: verifyJWT");
  const token = await getBearerTokenFromRequest(request);
  const message = "Couldn't parse or find bearer token.";
  if (token) {
    await verifyToken(token, jwksUri).catch((error) => {
      request.log.warn(error);
      reply.code(401).send({ message, error: error?.message });
    });
  } else {
    request.log.warn(message);
    reply.code(401).send({ message });
  }
};

/**
 * Verify Role to verify correct role, as part of the verifyAuthentication decorator.
 *
 * @param {FastifyRequest} request The fastify request is an instance of the standard http or http2 request objects.
 * @param {FastifyReply}   reply   The fastify reply object.
 */
const verifyRole = async (request, reply) => {
  request.log.debug("preValidation: verifyRole");
  const roles = await getRealmRoles(request);

  // Set the default role for all routes globally
  const routeRoleRequired = request.routeConfig?.role ?? "PMO-Manager-Edit-Capability";

  if (!roles.includes(routeRoleRequired)) {
    const message = `User doesn't have required role ${routeRoleRequired}`;
    request.log.warn(message);
    request.log.debug(roles);
    reply.code(401).send({ message });
  }
};

/**
 * Callback for verifyAuthentication decorator for auth.
 *
 * @param {FastifyRequest} request The fastify request is an instance of the standard http or http2 request objects.
 * @param {FastifyReply}   reply   The fastify reply object.
 */
const verifyAuthentication = async (request, reply) => {
  await verifyJWT(request, reply);
  await verifyRole(request, reply);
};

/**
 * Fastify server configuration.
 *
 * - Decorate the server object with an authentication handler
 * for verifying JWT tokens and roles.
 * - Register the fastify auth plugin used in combination with verifyJWT.
 * - Register the fastifyCors plugin.
 * - Register the fastifyMarkdown plugin.
 * - Register user routes.
 * - After all that is complete, add a preHandler hook. This sites in front
 * of all server requests.
 * - Register a couple more routes.
 *
 * @param   {object}          options Fastify options.
 * @returns {FastifyInstance}
 */
const fastifyInstance = (options) => {
  const app = fastify(options);
  app
    .decorate("verifyAuthentication", verifyAuthentication)
    .register(fastifyAuth)
    .register(fastifyCors, {})
    .register(fastifyPayload)
    .register(fastifyDBLogger)
    .setSchemaErrorFormatter((errors) => {
      return new Error(errors);
    })
    .setErrorHandler((error, request, reply) => {
      if (error.validation) {
        request.log.debug(error.validation);
        reply.status(400).send(error.validation);
      }
    })
    .after(() => {
      app.addHook("preValidation", app.auth([app.verifyAuthentication]));
      app.route({
        method: "GET",
        url: "/health",
        handler: async () => {
          return { health: "good" };
        },
      });
    });
  Object.values(allRoutes).forEach((route) => app.register(route.registerRoutes));
  return app;
};

module.exports = fastifyInstance;
