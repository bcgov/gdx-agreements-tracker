const pino = require("pino");
const { parse } = require("path");

// Set NODE_ENV environment variable to 'production' for OpenShift
const isDevelopmentMode = "development" === process?.env?.NODE_ENV;

const coreLogInstance = pino(
  isDevelopmentMode
    ? {
        level: "debug",
        transport: {
          target: "pino-pretty",
        },
      }
    : true // for production mode, use basic logging without pretty transport
);

const getLogInstance = (filename) => {
  return filename ? coreLogInstance.child({ component: parse(filename).name }) : coreLogInstance;
};

module.exports = getLogInstance;
