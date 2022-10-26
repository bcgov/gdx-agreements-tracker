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

const controller = useCommonComponents(api = "/api/v2", instance = "cdogs");

/**
 * Get a dictionary of supported input template file types and output file types.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getFileTypes = async (request, reply) => {
  // Using Axios to call api endpoint with Bearer token
  const axiosInstance = await controller.getAxios();

  try {
    const response = await axiosInstance.get("/fileTypes");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 * Generates an instance of axios using a Bearer token
 * 
 * @returns {object}
 */
controller.getAxios = async () => {
  // Gets grant type client credentials.
  const client = new ClientCredentials(config);
  const tokenParams = { scope: "<scope>" };
  const accessToken = await client.getToken(tokenParams);

  const axiosInstance = axios.create({
    baseURL: `${cdogsApi}${api}`,
    timeout: 1000,
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${accessToken?.token?.access_token}`
    },
  });
  return axiosInstance;
};

/**
* Generates a document from an inline template
*
* @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
* @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
* @returns {object}
*/
controller.renderReport = (request, reply) => {
  reply
    .type("application/pdf")
    .headers({
      "Content-Disposition": 'attachment'
    });
  return request.data;
};

/**
 * 
 * @param {*} request 
 * @param {*} reply 
 * @param {*} done 
 */
controller.onRequest = async (request, reply, done) => {
  // Get the template for the report from file
  const templateContent = await loadTemplate(path.resolve(__dirname, "../../reports/P_Status_MostRecent_Template.docx"));

  // Using Axios to call api endpoint with Bearer token
  const axiosInstance = await controller.getAxios();

  // Fields required to generate a document
  const body = {
    data: json,
    formatters: "{}",
    options: {
      cacheReport: true,
      convertTo: "pdf",
      overwrite: true,
      reportName: "test_report"
    },
    template: {
      content: templateContent,
      encodingType: "base64",
      fileType: "docx",
    },
  };

  // Additional required config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axiosInstance
    .post("/template/render", body, config)
    .then((response) => {
      request.data = response.data;
      done();
    })
    .catch((err) => {
      // This error needs to be handled more gracefully and give more information
      console.log(err);
      request.data = "";
      done();
    });
};

module.exports = controller;
