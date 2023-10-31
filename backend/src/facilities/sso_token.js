require("dotenv").config({ path: ".env" });

const singleSignOnApi = process.env.SINGLE_SIGN_ON_API;

const config = {
  client: {
    id: process.env.SINGLE_SIGN_ON_API_CLIENT_ID,
    secret: process.env.SINGLE_SIGN_ON_CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.SINGLE_SIGN_ON_API_TOKEN_HOST,
    tokenPath: process.env.SINGLE_SIGN_ON_API_TOKEN_PATH,
  },
};

module.exports = {
  singleSignOnApi,
  config,
};
