require('dotenv').config({ path: '.env' });
const serverConfig = require("./helpers/config");
const port = process.env.SERVER_PORT || 8080;
const { shutdown, initializeConnections } = require('./helpers/daemon');

// Graceful shutdown support.
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGUSR1', shutdown);
process.on('SIGUSR2', shutdown);
process.on('exit', () => {
  console.log('Exiting...');
});

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
  initializeConnections();
  try {
    await server.listen(port, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
