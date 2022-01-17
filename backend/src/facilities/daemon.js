const log = require('../facilities/logging.js')(module.filename);
const DatabaseConnection = require('../database/databaseConnection');
const dbConnection = new DatabaseConnection();

const state = {
  connections: {
    data: false,
  },
  ready: false,
  shutdown: false,
};
let probeId;

/**
 * @function shutdown
 * Shuts down this application after at least 3 seconds.
 */
const shutdown = () => {
  log.info('Received kill signal. Shutting down...');
  // Wait 3 seconds before starting cleanup
  if (!state.shutdown) setTimeout(cleanup, 3000);
}

/**
 * @function cleanup
 * Cleans up connections in this application.
 */
const cleanup = () => {
  log.info('Service no longer accepting traffic', { function: 'cleanup' });
  state.shutdown = true;

  log.info('Cleaning up...', { function: 'cleanup' });
  clearInterval(probeId);

  dbConnection.close(() => process.exit());

  // Wait 10 seconds max before hard exiting
  setTimeout(() => process.exit(), 10000);
}

/**
 *  @function initializeConnections
 *  Initializes the database connections
 *  This will force the application to exit if it fails
 */
const initializeConnections = () => {
  // Initialize connections and exit if unsuccessful
  const tasks = [
    dbConnection.checkAll(),
  ];

  Promise.all(tasks)
    .then(results => {
      state.connections.data = results[0];

      if (state.connections.data) {
        log.info('DatabaseConnection Reachable', { function: 'initializeConnections' });
      } else {
        log.info('DatabaseConnection Connected but not ready', { function: 'initializeConnections' });
      }
    })
    .catch(error => {
      log.error(`Initialization failed: Database OK = ${state.connections.data}`, { function: 'initializeConnections' });
      log.error('Connection initialization failure', error.message, { function: 'initializeConnections' });
      if (!state.ready) {
        process.exitCode = 1;
        shutdown();
      }
    })
    .finally(() => {
      state.ready = Object.values(state.connections).every(x => x);
      if (state.ready) {
        log.info('API ready to accept traffic', { function: 'initializeConnections' });
        // Start periodic 10 second connection probe check
        probeId = setInterval(checkConnections, 10000);
      }
    });
}

/**
 * @function checkConnections
 * Checks Database connectivity
 * This will force the application to exit if a connection fails
 */
const checkConnections = () => {
  const wasReady = state.ready;
  if (!state.shutdown) {
    const tasks = [
      dbConnection.checkConnection(),
    ];

    Promise.all(tasks).then(results => {
      state.connections.data = results[0];
      state.ready = Object.values(state.connections).every(x => x);
      if (!wasReady && state.ready) {
        log.info('Service ready to accept traffic', { function: 'checkConnections' });
      }

      if (!state.ready) {
        process.exitCode = 1;
        shutdown();
      }
    });
  }
}

/**
 * @function registerSignalHandlers
 * Registers signal handlers for graceful shutdown.
 */
const registerSignalHandlers = () => {
  log.info('Registering signal handlers for graceful shutdown.');

  // Graceful shutdown support.
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
  process.on('SIGUSR1', shutdown);
  process.on('SIGUSR2', shutdown);
  process.on('exit', () => {
    log.info('Exiting...');
  });
}

module.exports = {
  initializeConnections,
  registerSignalHandlers,
  shutdown,
  state,
}
