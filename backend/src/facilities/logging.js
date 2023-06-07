const pino = require("pino");
const { parse } = require("path");

// Set NODE_ENV environment variable to 'production' for OpenShift
// logging configuration reference: https://www.fastify.io/docs/latest/Reference/Logging/
const coreLogInstance = pino(
  "development" === process?.env?.NODE_ENV
    ? {
        level: "debug",
        transport: {
          target: "pino-pretty",
        },
      }
    : {
        level: "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorizeObjects: false,
            singleLine: true,
          },
        },
      }
);

const getLogInstance = (filename) => {
  return filename ? coreLogInstance.child({ component: parse(filename).name }) : coreLogInstance;
};

module.exports = getLogInstance;
