require("dotenv").config();
const { loadSecretFileOrUseEnv } = require('./src/helpers/secrets');

module.exports = {
  client: "pg",
  useNullAsDefault: true,
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER,
    // OpenShift secret-file support for database password
    password: loadSecretFileOrUseEnv('/run/secrets/postgres_password', 'POSTGRES_PASSWORD'),
    database: process.env.POSTGRES_DATABASE
  },
  searchPath: ['pmo', 'public'],
  migrations: {
    tableName: 'migrations',
    directory: "./src/database/migrations"
  },
  seeds: {
    directory: "./src/database/seeds"
  }

};
