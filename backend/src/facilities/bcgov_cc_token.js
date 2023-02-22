require("dotenv").config({ path: ".env" });

const chesApi = process.env.COMMON_COMPONENT_CHES_API;
const cdogsApi = process.env.COMMON_COMPONENT_CDOGS_API;

const auth = {
  tokenHost: process.env.COMMON_COMPONENT_TOKEN_HOST,
  tokenPath: process.env.COMMON_COMPONENT_TOKEN_PATH,
};

const config = {
  cdogs: {
    client: {
      id: process.env.CDOGS_CLIENT_ID,
      secret: process.env.CDOGS_SECRET,
    },
    auth: auth,
  },
  ches: {
    client: {
      id: process.env.CHES_CLIENT_ID,
      secret: process.env.CHES_SECRET,
    },
    auth: auth,
  },
};

module.exports = {
  chesApi,
  cdogsApi,
  config,
};