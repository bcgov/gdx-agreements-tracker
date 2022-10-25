const useCommonComponents = require("./useCommonComponents/index.js");

const { config, cdogsApi } = require("../facilities/bcgov_cc_token");
const { ClientCredentials } = require("simple-oauth2");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param  file
 */
const loadTemplate = async (file) => {
  let data;
  try {
    data = await fs.readFileSync(file);
    data = data.toString("base64");
  } catch (err) {
  }
  return data;
};

/**
 * Get health of CDOGS
 *
 * @param   {string} healthApi API route used to get health of CDOGS.
 * @returns {object}
 */

const controller = useCommonComponents("cdogs");

/**
 * Get a dictionary of supported input template file types and output file types.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getFileTypes = async (request, reply) => {
  // Using Axios to call api endpoint with Bearer token
  const response = await controller.api.get("/fileTypes");
  return response;
};

module.exports = controller;
