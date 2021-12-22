const DatabaseConnection = require('../database/databaseConnection');
const dbConnection = new DatabaseConnection();

const state = {
  connections: {
    data: false
  },
  ready: false,
  shutdown: false
};
let probeId;

/**
 * @function shutdown
 * Shuts down this application after at least 3 seconds.
 */
const shutdown = () => {
  console.log('Received kill signal. Shutting down...');
  // Wait 3 seconds before starting cleanup
  if (!state.shutdown) setTimeout(cleanup, 3000);
}

/**
 * @function cleanup
 * Cleans up connections in this application.
 */
const cleanup = () => {
  console.log('Service no longer accepting traffic', { function: 'cleanup' });
  state.shutdown = true;

  console.log('Cleaning up...', { function: 'cleanup' });
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
    dbConnection.checkAll()
  ];

  Promise.all(tasks)
    .then(results => {
      state.connections.data = results[0];

      if (state.connections.data) {
        console.log('DatabaseConnection Reachable', { function: 'initializeConnections' });
      }
    })
    .catch(error => {
      console.log(`Initialization failed: Database OK = ${state.connections.data}`, { function: 'initializeConnections' });
      console.log('Connection initialization failure', error.message, { function: 'initializeConnections' });
      if (!state.ready) {
        process.exitCode = 1;
        shutdown();
      }
    })
    .finally(() => {
      state.ready = Object.values(state.connections).every(x => x);
      if (state.ready) {
        console.log('Service ready to accept traffic', { function: 'initializeConnections' });
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
      dbConnection.checkConnection()
    ];

    Promise.all(tasks).then(results => {
      state.connections.data = results[0];
      state.ready = Object.values(state.connections).every(x => x);
      if (!wasReady && state.ready) {
        console.log('Service ready to accept traffic', { function: 'checkConnections' });
      }
      console.log(state);
      if (!state.ready) {
        process.exitCode = 1;
        shutdown();
      }
    });
  }
}

module.exports = {
  initializeConnections,
  shutdown,
  state
}
