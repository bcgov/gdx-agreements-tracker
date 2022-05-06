const log = require("../facilities/logging.js")(module.filename);
const Knex = require("knex");
const knexConfig = require("../../knexfile");

/**
 * @module DatabaseConnection
 *
 * Create and check the connection for data persistence.
 * Based on module from bcgov/common-hosted-form-service.
 * @see Knex
 * @exports DatabaseConnection
 */
class DatabaseConnection {
  /**
   * Creates a new DatabaseConnection with Knex configuration.
   */
  constructor() {
    if (!DatabaseConnection.instance) {
      this.knex = Knex(knexConfig);
      DatabaseConnection.instance = this;
    }

    return DatabaseConnection.instance;
  }

  /**
   * Gets the current state of connection. True if connected, false if not.
   *
   * @returns {boolean}
   */
  get connected() {
    return this._connected;
  }

  /**
   * Gets the current knex binding.
   *
   * @returns {Knex}
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
   * Checks the Knex connection, the database schema, and Objection models.
   *
   * @returns {boolean} True if successful, otherwise false.
   */
  async checkAll() {
    log.info("Connecting to database... %o", {
      ...this.knex.context.client.config.connection,
      password: "*** ***",
    });
    let connectOk = await this.checkConnection();

    //If the database does not exist, and we have been requested to auto-deploy, then try.
    if (-1 === connectOk && "1" === process.env.DATABASE_AUTO_DEPLOY) {
      log.info(
        `db bootstrap: database "${knexConfig.connection.database}" not found. attempting to auto-bootstrap it...`
      );
      if (await this.bootstrapDatabase(knexConfig.connection.database)) {
        // If the bootstrapping seemed successful, see if we can connect properly now.
        connectOk = await this.checkConnection();
      }
    }

    const schemaOk = await this.checkSchema();
    //const modelsOk = this.checkModel();

    log.debug(`Connect OK: ${connectOk}, Schema OK: ${schemaOk}`, { function: "checkAll" });
    this._connected = !!connectOk && schemaOk;
    return this._connected;
  }

  /**
   * Checks the current knex connection to Postgres.
   * If the connected DB is in read-only mode, transaction_read_only will not be off.
   *
   * @returns {boolean|integer} True if successful, -1 if the intended database is missing, otherwise false.
   */
  async checkConnection() {
    try {
      const data = await this.knex.raw("show transaction_read_only");
      const result = data && data.rows && "off" === data.rows[0].transaction_read_only;
      if (result) {
        log.trace("Database connection ok", { function: "checkConnection" });
      } else {
        log.warn("Database connection is read-only", { function: "checkConnection" });
      }
      return result;
    } catch (err) {
      log.error(`Error with database connection: ${err.message}`, { function: "checkConnection" });

      // If the problem is simply that the database does not exist, signal differently.
      if (err.message === `database "${knexConfig.connection.database}" does not exist`) {
        return -1;
      }

      return false;
    }
  }

  /**
   * Queries the knex connection to check for the existence of the expected schema tables.
   *
   * @returns {boolean} True if schema is ok, otherwise false.
   */
  checkSchema() {
    const tables = ["migrations"];
    try {
      return Promise.all(tables.map((table) => this._knex.schema.hasTable(table)))
        .then((exists) => exists.every((x) => x))
        .then((result) => {
          if (result) {
            log.debug("Database schema ok", { function: "checkSchema" });
          }
          return result;
        });
    } catch (err) {
      log.error(`Error with database schema: ${err.message}`, {
        error: err,
        function: "checkSchema",
      });
      return false;
    }
  }

  /**
   * Will close the DatabaseConnection.
   *
   * @param {Function} [cb] Optional callback.
   */
  close(cb = undefined) {
    if (this.knex) {
      try {
        this.knex.destroy(() => {
          this._connected = false;
          log.info("Disconnected", { function: "close" });
          if (cb) cb();
        });
      } catch (e) {
        log.error("Failed to close", { error: e, function: "recoverMessage" });
      }
    }
  }

  /**
   * Invalidates and reconnects existing knex connection.
   */
  resetConnection() {
    log.warn("Attempting to reset database connection pool...", { function: "resetConnection" });
    this.knex.destroy(() => {
      this.knex.initialize();
    });
  }

  /**
   * Bootstraps the database if it hasn't been set up yet.
   *
   * @param {string} databaseName The name of the database.
   * @returns {boolean} Success (true) or failure.
   */
  async bootstrapDatabase(databaseName) {
    log.info(`db bootstrap: attempting to create database "${databaseName}".`);

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
      log.info(`db bootstrap: database "${databaseName}" created.`);
      result = true;
    } catch (err) {
      log.error(`db bootstrap: there was a problem creating database "${databaseName}": `, err);
      result = false;
    } finally {
      await bootstrapKnex.destroy();
    }
    return result;
  }
}

module.exports = DatabaseConnection;
