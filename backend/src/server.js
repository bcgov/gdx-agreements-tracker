require('dotenv').config({ path: '.env' });
const userRoutes = require('./routes/user');
const authPreHandler = require('./helpers/auth');
const port = process.env.SERVER_PORT || 8080;
const fastifyCors = require('fastify-cors');
const fastify = require('fastify')({
    logger: {
        level: 'info',
        // We can output logs to a file with fastify's default logger.
        // file: '/path/to/file'
    }
});

/**
 * CORS options.
 */
fastify.register(fastifyCors, { 
    /**
     * Put all the api options in one place.
     */
});

/**
 * Fastify global hooks allow us to hook into the pre-
 * request handler. This is one of the many options we have
 * for authorizing responses.
 * 
 * @link https://www.fastify.io/docs/latest/Hooks/
 */
fastify.addHook('preHandler', async (request, reply) => {
    request.log.info('I  am running on each request');
    const isAuth = await authPreHandler(false);
    if ( isAuth ) {
        reply
        .code(401)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: "Not authorized." });
    } else {
        reply.code(200);
    }
});

// Register root route.
fastify.route({
  method: 'GET',
  url: '/',
  handler: async () => {
    return { hello: 'world' }
  }
});

// Register all the user routes.
userRoutes.forEach((route, index) => {
    fastify.route(route);
});

fastify.route({
    method: 'GET',
    url: '/api/health',
    handler: async () => {
      return { health: 'good' }
    }
});

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