const fs = require("fs");

const loadSecretFileOrUseEnv = (filePath, envName) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return process.env[envName];
  }
};

module.exports = { loadSecretFileOrUseEnv };
