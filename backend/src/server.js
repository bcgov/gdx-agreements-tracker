require('dotenv').config({ path: '.env' });
const userRoutes = require('./routes/user');
const { validateToken } = require('./helpers/auth');
const port = process.env.SERVER_PORT || 8080;
const jwksUri = process.env.JWKSURI;
const fastifyCors = require('fastify-cors');
const fastifyAuth = require('fastify-auth');
const fastify = require('fastify')({
    logger: {
        level: 'info',
        // We can output logs to a file with fastify's default logger.
        // file: '/path/to/file'
    }
});

// Fastify server config.
fastify
  .decorate('verifyJWT', (req, res, done) => {
      validateToken(jwksUri, req)
        .then(() => done())
        .catch((err) => done(new Error(err)));
  })
  .register(fastifyAuth)
  .register(fastifyCors, {})
  .register(userRoutes)
  .after(() => {
    fastify.addHook('preHandler', fastify.auth([
        fastify.verifyJWT
    ]));

    // Register root route.
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async () => {
            return { hello: 'world' }
        }
    });

    fastify.route({
        method: 'GET',
        url: '/api/health',
        handler: async () => {
          return { health: 'good' }
        }
    });
  })

// Start the server.
const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();