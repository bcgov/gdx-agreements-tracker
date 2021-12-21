require('dotenv').config({ path: '.env' });
const serverConfig = require("./helpers/config");
const port = process.env.SERVER_PORT || 8080;

// Save server configuration and enable logging.
const server = serverConfig(({
    logger: {
        level: 'info',
        // We can output logs to a file with fastify's default logger.
        // file: '/path/to/file'
    }
}));

// Start the server.
const start = async () => {
  try {
    await server.listen(port, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();