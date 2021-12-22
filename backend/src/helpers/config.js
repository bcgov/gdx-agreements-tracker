require('dotenv').config({ path: '../.env' });
const userRoutes = require('../routes/user');
const { getBearerTokenFromRequest, verifyToken } = require('./auth');
const jwksUri = process.env.JWKSURI;
const fastify = require('fastify');
const fastifyCors = require('fastify-cors');
const fastifyAuth = require('fastify-auth');

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
 const serverConfig = (options) => {
    const app = fastify(options);
    app.decorate('verifyJWT', (req, res, done) => {
            const token = getBearerTokenFromRequest(req);
            if (token) {
                verifyToken(token, jwksUri)
                    .then(() => done())
                    .catch((err) => done(err));
            } else {
                done(new Error("Error: Couldn't parse bearer token."))
            }
        })
        .register(fastifyAuth)
        .register(fastifyCors, {})
        .register(userRoutes)
        .after(() => {
            app.addHook('preHandler', app.auth([
                app.verifyJWT
            ]));

            // Register root route.
            app.route({
                method: 'GET',
                url: '/',
                handler: async () => {
                    return { hello: 'world' }
                }
            });

            app.route({
                method: 'GET',
                url: '/health',
                handler: async () => {
                return { health: 'good' }
                }
            });
    })

    return app;
}

module.exports = serverConfig;
