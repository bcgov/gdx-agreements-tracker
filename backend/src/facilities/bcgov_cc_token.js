require("dotenv").config({ path: ".env" });

const chesApi = process.env.COMMON_COMPONENT_CHES_API;
const cdogsApi = process.env.COMMON_COMPONENT_CDOGS_API;
const config = {
  client: {
    id: process.env.COMMON_COMPONENT_CLIENT_ID,
    secret: process.env.COMMON_COMPONENT_SECRET,
  },
  auth: {
    tokenHost: process.env.COMMON_COMPONENT_TOKEN_HOST,
    tokenPath: process.env.COMMON_COMPONENT_TOKEN_PATH,
  },
};

module.exports = {
  chesApi,
  cdogsApi,
  config,
};
