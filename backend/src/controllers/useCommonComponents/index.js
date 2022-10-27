/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const { config, chesApi, cdogsApi } = require("../../facilities/bcgov_cc_token");

const { ClientCredentials } = require("simple-oauth2");
const axios = require("axios");

const useCommonComponents = (instance) => {
  const getAxiosInstance = async () => {
    // Gets grant type client credentials.
    const client = new ClientCredentials(config);
    const tokenParams = { scope: "<scope>" };
    const accessToken = await client.getToken(tokenParams);
    // Using Axios to call api endpoint with Bearer token.
    return axios.create({
      baseURL: `${"cdogs" === instance ? cdogsApi : chesApi}/api/v2`,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${accessToken?.token?.access_token}`,
        "Content-Type": "application/json",
      },
    });
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
        response = response?.data;
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

  const getHealth = async (request, reply) => {
    return await api.get("/health");
  };

  return { api, getHealth };
};

module.exports = useCommonComponents;
