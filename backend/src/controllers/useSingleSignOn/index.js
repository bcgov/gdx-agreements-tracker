/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const { singleSignOnApi, config } = require("../../facilities/sso_token");

const { ClientCredentials } = require("simple-oauth2");
const axios = require("axios");

const useSingleSignOn = () => {
  const getAxiosInstance = async () => {
    // Gets grant type client credentials.
    const client = new ClientCredentials(config);
    try {
      const accessToken = await client.getToken();
      return axios.create({
        baseURL: singleSignOnApi,
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${accessToken?.token?.access_token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Access Token error", error);
      return error;
    }

    // Using Axios to call api endpoint with Bearer token.
  };

  /**
   * Access api endpoint either post or get.
   */
  const api = {
    get: async (endPoint, config = {}) => {
      let response = {};
      const axiosInstance = await getAxiosInstance();
      try {
        response = await axiosInstance.get(endPoint, config);
        response = response?.data?.data;
      } catch (error) {
        console.error(error);
        response = error;
      }
      return response;
    },
    post: async (endPoint, body = {}, config = {}) => {
      let response = {};
      const axiosInstance = await getAxiosInstance();
      try {
        response = await axiosInstance.post(endPoint, body, config);
        response = response?.data;
      } catch (error) {
        console.error(error);
        response = error;
      }
      return response;
    },
  };

  return { api };
};

module.exports = useSingleSignOn;
