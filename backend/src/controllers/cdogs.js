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
      "Authorization": `Bearer ${accessToken?.token?.access_token}`
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
controller.renderReport = async (request, reply) => {
  reply
    .type("application/pdf")
    .headers({
      "Content-Disposition": `attachment; filename='test.pdf'`
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
  const fileContent = await loadTemplate(path.resolve(__dirname, "../../reports/test.docx"));
  
  // Using Axios to call api endpoint with Bearer token
  const axiosInstance = await controller.getAxios();

  // Fields required to generate a document
  const body = {
    data: {
      data: {
        project: {
          project_manager: "Wilson, Mark"
        },
      },
    },
    //formatters: "{}",
    options: {
      //cacheReport: true,
      convertTo: "pdf",
      overwrite: true,
      //reportName: "test_report.txt"
    },
    template: {
      content: fileContent,
      encodingType: "base64",
      fileType: "docx",
      reportName: "myreport",
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
      console.log(err);
    });
};

module.exports = controller;
