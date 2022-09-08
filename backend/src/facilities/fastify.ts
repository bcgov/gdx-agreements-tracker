require("dotenv").config({ path: "../.env" });
import allRoutes from "../routes";
import keycloak from "../facilities/keycloak";
const jwksUri = process.env.JWKSURI;
const fastify = require("fastify");
const fastifyCors = require("fastify-cors");
const fastifyAuth = require("fastify-auth");
import fastifyRoles from "../plugins/fastify-roles";
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
 * @param   {object}          options Fastify options.
 * @returns {FastifyInstance}
 */
const fastifyInstance = (options: any) => {
  const { getBearerTokenFromRequest, verifyToken, verifyUserExists } = keycloak();
  const app = fastify(options);
  app
    .decorate("verifyJWT", (req: any, res: any, done: any) => {
      const token = getBearerTokenFromRequest(req);
      //todo: This is a temporary measure to aid development and should be removed. https://apps.itsm.gov.bc.ca/jira/browse/DESCW-455
      if ("development" === process.env.NODE_ENV) {
        done();
      }
      if (token) {
        verifyToken(token, jwksUri)
          .then((res: any) => {
            req.log.debug(res);
            return verifyUserExists(token);
          })
          .then((res: any) => {
            req.log.debug(res);
            done();
          })
          .catch((err: any) => done(err));
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
  Object.values(allRoutes).forEach((route: any) => app.register(route.registerRoutes));

  return app;
};

export default fastifyInstance;
