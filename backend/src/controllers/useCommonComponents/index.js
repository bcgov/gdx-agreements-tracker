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

const useCommonComponents = (healthApi, instance) => {
  const getHealth = async (request, reply, api) => {
    // Gets grant type client credentials.
    const client = new ClientCredentials(config);
    const tokenParams = { scope: "<scope>" };

    const accessToken = await client.getToken(tokenParams);
    // Using Axios to call api endpoint with Bearer token.
    const axiosInstance = axios.create({
      baseURL: `${"cdogs" === instance ? cdogsApi : chesApi}${healthApi}`,
      timeout: 1000,
      headers: { Authorization: `Bearer ${accessToken?.token?.access_token}` },
    });

    try {
      const response = await axiosInstance.get("/health");
      reply.send(response.data);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return { getHealth };
};

module.exports = useCommonComponents;
