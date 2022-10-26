const useCommonComponents = require("./useCommonComponents/index.js");
// Authentication
const { config, cdogsApi } = require("../facilities/bcgov_cc_token");
const { ClientCredentials } = require("simple-oauth2");
const axios = require("axios");
// Template and data reading
const fs = require("fs");
const path = require("path");
const json = require("../../reports/data.json")

/**
 * Reads a file and encodes it to the specified format
 * @param   {string}  path The path of the file to read
 * @param   {string}  encoding The format with which to encode the file contents
 * @returns {string} 
 */
const loadTemplate = async (path, encoding = "base64") => {
  let data;
  try {
    data = await fs.readFileSync(path);
    data = data.toString(encoding);
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
