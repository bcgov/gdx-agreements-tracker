const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const fp = require("fastify-plugin");
const { getUserInfo } = require("@facilities/keycloak");

const fastifyDBLogger = async (fastify) => {
  const dbLogTable = `${dataBaseSchemas().config}.db_logs`;

  fastify.addHook("onSend", async (request, reply, payload) => {
    const { method, body, url } = request;

    // Skip logging for GET and db_lock calls
    if ("GET" === method || "OPTIONS" === method || url.includes("db_lock")) return;
    const requestUser = await getUserInfo(request);
    try {
      const logData = {
        api_method: method,
        api_date: new Date(),
        api_user: requestUser?.name,
        api_body: "POST" === method ? JSON.parse(payload) : body,
        api_url: url,
      };

      await knex(dbLogTable).insert(logData);
    } catch (error) {
      console.error("Database logging failed...", error);
    }
  });
};

module.exports = fp(fastifyDBLogger, {
  fastify: "4.x",
  name: "fastifyDBLogger",
});
