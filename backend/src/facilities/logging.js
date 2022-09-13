const pino = require("pino");
const { parse } = require("path");

const coreLogInstance = pino({
  // Set NODE_ENV environment variable to 'production' for OpenShift
  level: "production" === process.env.NODE_ENV ? "info" : "debug",
  transport: {
    target: "pino-pretty",
  },
});

const getLogInstance = (filename) => {
  return filename ? coreLogInstance.child({ component: parse(filename).name }) : coreLogInstance;
};

module.exports = getLogInstance;
