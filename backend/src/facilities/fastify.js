require("dotenv").config({ path: "../.env" });
const allRoutes = require("@routes/index.js");
const { getBearerTokenFromRequest, verifyToken } = require("../facilities/keycloak");
const jwksUri = process.env.JWKSURI;
const fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifyAuth = require("@fastify/auth");
const fastifyPayload = require("../plugins/fastifyPayload");

/**
 * Fastify server configuration.
 *
 * - Decorate the server object with an authentication handler
 * for verifying JWT tokens.
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
    .decorate("verifyJWT", (req, res, done) => {
      const token = getBearerTokenFromRequest(req);
      if (token) {
        verifyToken(token, jwksUri)
          .then((res) => {
            done();
          })
          .catch((err) => {
            req.log.error(err);
            //TODO: The redirect 401 should be added here, and the done removed.  However the frontend doesn't handle this properly.
            //res.redirect(401)
            done();
          });
      } else {
        const error = new Error("Error: Couldn't parse bearer token.");
        req.log.error(error.message);
        res.redirect(401);
      }
    })
    .register(fastifyAuth)
    .register(fastifyCors, {})
    .register(fastifyPayload)
    .after(() => {
      app.addHook("preHandler", app.auth([app.verifyJWT]));

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
