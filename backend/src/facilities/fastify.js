require("dotenv").config({ path: "../.env" });
const allRoutes = require("../routes/index.js");
const {
  getBearerTokenFromRequest,
  verifyToken,
  verifyUserExists,
} = require("../facilities/keycloak");
const jwksUri = process.env.JWKSURI;
const fastify = require("fastify");
const fastifyCors = require("fastify-cors");
const fastifyAuth = require("fastify-auth");
const fastifyRoles = require("../plugins/fastify-roles");

/**
 * Fastify server configuration.
 *
 * - Decorate the server object with an authentication handler
 * for verifying JWT tokens.
 * - Register the fastify auth plugin used in combination with verifyJWT.
 * - Resgister the fastifyCors plugin.
 * - Register user routes.
 * - After all that is complete, add a preHandler hook. This sites in front
 * of all server requests.
 * - Register a couple more routes.
 *
 * @param {Object} options
 * @returns {FastifyInstance}
 */
const fastifyInstance = (options) => {
  const app = fastify(options);
  app
    .decorate("verifyJWT", (req, res, done) => {
      const token = getBearerTokenFromRequest(req);

      if (token) {
        verifyToken(token, jwksUri)
          .then((res) => {
            req.log.debug(res);
            return verifyUserExists(token);
          })
          .then((res) => {
            req.log.debug(res);
            done();
          })
          .catch((err) => done(err));
      } else {
        done(new Error("Error: Couldn't parse bearer token."));
      }
    })
    .register(fastifyAuth)
    .register(fastifyCors, {})
    .register(fastifyRoles)
    .after(() => {
      app.addHook("preHandler", app.auth([app.verifyJWT]));

      // Register root route.
      app.route({
        method: "GET",
        url: "/",
        handler: async () => {
          return { hello: "world" };
        },
      });

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
