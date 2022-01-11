const pino = require('pino');
const { parse } = require('path');

const coreLogInstance = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

const getLogInstance = (filename) => {
  return filename ? coreLogInstance.child({ component: parse(filename).name }) : coreLogInstance;
};

module.exports = getLogInstance;
