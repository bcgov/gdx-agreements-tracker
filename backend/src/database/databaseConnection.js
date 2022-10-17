const log = require("../facilities/logging.js")(module.filename);
const Knex = require("knex");
const knexConfig = require("../../knexfile");

const databaseConnection = () => {
  let _connected = false;

  const knex = Knex(knexConfig);

  // This creates a new knex query type, so knex.pickerOptionSelect(option: object).
  if ("undefined" === typeof knex.pickerOptionSelect) {
    Knex.QueryBuilder.extend("pickerOptionSelect", function (option) {
      return this.columns(
        { name: knex.raw(`'${option.name}'`) },
        { title: knex.raw(`'${option.title}'`) },
        { description: knex.raw(`'${option.description}'`) },
        {
          definition: knex.raw(`
        (
          SELECT json_agg(${option.id}) 
          FROM (
            SELECT  ${option.value} AS value, 
            ${option.label} AS label 
            FROM ${option.table}
            ${option?.queryAdditions}
          ) 
          ${option.id}
        )`),
        },
        { associated_form: knex.raw("'_options'") }
      );
    });
  }

  // ...this.knex.context.client.config.connection,
  /**
   * Checks the Knex connection, the database schema, and Objection models.
   *
   * @returns {boolean} True if successful, otherwise false.
   */
  const checkAll = async () => {
    const connection = knex.context.client.config.connection;
    log.info("Connecting to database... %o", {
      connection,
      password: "*** ***",
    });
    let connectOk = await checkConnection();

    //If the database does not exist, and we have been requested to auto-deploy, then try.
    if (-1 === connectOk && "1" === process.env.DATABASE_AUTO_DEPLOY) {
      log.info(
        `db bootstrap: database "${knexConfig.connection.database}" not found. attempting to auto-bootstrap it...`
      );
      if (await bootstrapDatabase(knexConfig.connection.database)) {
        // If the bootstrapping seemed successful, see if we can connect properly now.
        connectOk = await checkConnection();
      }
    }

    const schemaOk = checkSchema();
    //const modelsOk = this.checkModel();

    log.debug(`Connect OK: ${connectOk}, Schema OK: ${schemaOk}`, { function: "checkAll" });
    _connected = !!connectOk && schemaOk;
    return _connected;
  };

  /**
   * Checks the current knex connection to Postgres.
   * If the connected DB is in read-only mode, transaction_read_only will not be off.
   *
   * @returns {boolean|integer} True if successful, -1 if the intended database is missing, otherwise false.
   */
  const checkConnection = async () => {
    try {
      const data = await knex.raw("show transaction_read_only");
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
  };

  /**
   * Queries the knex connection to check for the existence of the expected schema tables.
   *
   * @returns {boolean} True if schema is ok, otherwise false.
   */
  const checkSchema = () => {
    const tables = ["migrations"];
    try {
      return Promise.all(tables.map((table) => knex.schema.hasTable(table)))
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
  };

  /**
   * Will close the DatabaseConnection.
   *
   * @param {Function} [cb] Optional callback.
   */
  const close = (cb = undefined) => {
    if (knex) {
      try {
        knex.destroy(() => {
          _connected = false;
          log.info("Disconnected", { function: "close" });
          if (cb) cb();
        });
      } catch (e) {
        log.error("Failed to close", { error: e, function: "recoverMessage" });
      }
    }
  };

  /**
   * Invalidates and reconnects existing knex connection.
   */
  const resetConnection = () => {
    log.warn("Attempting to reset database connection pool...", { function: "resetConnection" });
    knex.destroy(() => {
      knex.initialize();
    });
  };

  const dataBaseSchemas = () => {
    return { data: "data", config: "config", public: "public" };
  };

  /**
   * Bootstraps the database if it hasn't been set up yet.
   *
   * @param   {string}  databaseName The name of the database.
   * @returns {boolean}              Success (true) or failure.
   */
  const bootstrapDatabase = async (databaseName) => {
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
  };

  return {
    dataBaseSchemas,
    bootstrapDatabase,
    resetConnection,
    close,
    checkSchema,
    checkConnection,
    checkAll,
    knex,
  };
};

module.exports = databaseConnection;
