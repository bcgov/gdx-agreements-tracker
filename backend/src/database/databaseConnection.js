const Knex = require("knex");
const knexConfig = require("../../knexfile");

/**
 * @module DatabaseConnection
 *
 * Create and check the connection for data persistence.
 * Based on module from bcgov/common-hosted-form-service.
 *
 * @see Knex
 *
 * @exports DatabaseConnection
 */
class DatabaseConnection {
  /**
   * Creates a new DatabaseConnection with Knex configuration.
   * @class
   */
  constructor() {
    if (!DatabaseConnection.instance) {
      this.knex = Knex(knexConfig);
      DatabaseConnection.instance = this;
    }

    return DatabaseConnection.instance;
  }

  /**
   * @function connected
   * True or false if connected.
   */
  get connected() {
    return this._connected;
  }

  /**
   * @function knex
   * Gets the current knex binding.
   */
  get knex() {
    return this._knex;
  }

  /**
   * @function knex
   * Sets the current knex binding.
   * @param {object} v - a Knex object.
   */
  set knex(v) {
    this._knex = v;
    this._connected = false;
  }

  /**
   * @function checkAll
   * Checks the Knex connection, the database schema, and Objection models.
   * @returns {boolean} True if successful, otherwise false.
   */
  async checkAll() {
    const connectOk = await this.checkConnection();
    const schemaOk = await this.checkSchema();
    //const modelsOk = this.checkModel();

    console.log(`Connect OK: ${connectOk}, Schema OK: ${schemaOk}`, { function: 'checkAll' });
    this._connected = connectOk && schemaOk;
    return this._connected;
  }

  /**
   * @function checkConnection
   * Checks the current knex connection to Postgres.
   * If the connected DB is in read-only mode, transaction_read_only will not be off.
   * @returns {boolean} True if successful, otherwise false.
   */
  async checkConnection(no_bootstrap = false) {
    try {
      const data = await this.knex.raw('show transaction_read_only');
      const result = data && data.rows && data.rows[0].transaction_read_only === 'off';
      if (result) {
        console.log('Database connection ok', { function: 'checkConnection' });
      } else {
        console.log('Database connection is read-only', { function: 'checkConnection' });
      }
      return result;
    } catch (err) {
      console.log(`Error with database connection: ${err.message}`, { function: 'checkConnection' });

      // If the database does not exist, and auto-deploy is enabled, attempt to bootstrap the database.
      if (!no_bootstrap && process.env.DATABASE_AUTO_DEPLOY === '1' && err.message === `database "${knexConfig.connection.database}" does not exist`) {
        console.log(`db bootstrap: database "${knexConfig.connection.database}" not found. attempting to auto-bootstrap it...`);
        if (await this.bootstrapDatabase(knexConfig.connection.database)) {
          // If the bootstrapping seemed successful, call ourself to see if we can connect properly now, but don't try to bootstrap again.
          return this.checkConnection(true);
        }
      }

      return false;
    }
  }

  /**
   * @function checkSchema
   * Queries the knex connection to check for the existence of the expected schema tables.
   * @returns {boolean} True if schema is ok, otherwise false.
   */
  checkSchema() {
    const tables = ['migrations'];
    try {
      return Promise
        .all(tables.map(table => this._knex.schema.hasTable(table)))
        .then(exists => exists.every(x => x))
        .then(result => {
          if (result) {
            console.log('Database schema ok', { function: 'checkSchema' });
          }
          return result;
        });
    } catch (err) {
      console.log(`Error with database schema: ${err.message}`, { error: err, function: 'checkSchema' });
      return false;
    }
  }

  /**
   * @function close
   * Will close the DatabaseConnection.
   * @param {function} [cb] Optional callback.
   */
  close(cb = undefined) {
    if (this.knex) {
      try {
        this.knex.destroy(() => {
          this._connected = false;
          console.log('Disconnected', { function: 'close' });
          if (cb) cb();
        });
      } catch (e) {
        console.log('Failed to close', { error: e, function: 'recoverMessage' });
      }
    }
  }

  /**
   * @function resetConnection
   * Invalidates and reconnects existing knex connection.
   */
  resetConnection() {
    console.log('Attempting to reset database connection pool...', { function: 'resetConnection' });
    this.knex.destroy(() => {
      this.knex.initialize();
    });
  }

  /**
   * @function bootstrapDatabase
   * Bootstraps the database if it hasn't been set up yet.
   */
  async bootstrapDatabase(databaseName) {
    console.log(`db bootstrap: attempting to create database "${databaseName}".`);

    // If we try to connect with a database set in the config, we will get the same connection errors
    // that brought us here, so clear it out so that we can do anything we want.
    let bootstrapConfig = { ...knexConfig };
    bootstrapConfig.connection.database = null;

    // A separate database connection to use with our separate config.
    const bootstrapKnex = require("knex")(bootstrapConfig);
    let result = false;
    try {
      await bootstrapKnex.raw(
        `CREATE DATABASE ${databaseName}\n` +
        "WITH \n" +
        "OWNER = postgres\n" +
        "ENCODING = 'UTF8'\n" +
        "LC_COLLATE = 'en_US.utf8'\n" +
        "LC_CTYPE = 'en_US.utf8'\n" +
        "TABLESPACE = pg_default\n" +
        "CONNECTION LIMIT = -1;"
      );
      console.log(`db bootstrap: database "${databaseName}" created.`);
      result = true;
    } catch(err) {
      console.log(`db bootstrap: there was a problem creating database "${databaseName}": `, err);
      result = false;
    } finally {
      await bootstrapKnex.destroy();
    }
    return result;
  }

}

module.exports = DatabaseConnection;
