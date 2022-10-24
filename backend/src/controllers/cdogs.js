const useCommonComponents = require("./useCommonComponents/index.js");
const useDownloadFile = require("./useDownloadFile/index.js")

const { config, cdogsApi } = require("../facilities/bcgov_cc_token");
const { ClientCredentials } = require("simple-oauth2");
const axios = require("axios");

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
    reply.send(response.data);
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 * Generates an instance of axios using a Bearer token
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
    headers: { "Authorization": `Bearer ${accessToken?.token?.access_token}` },
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
  // Using Axios to call api endpoint with Bearer token
  const axiosInstance = await controller.getAxios();

  // Fields required to generate a document
  const body = {
    data: {
      data: {
        project: {
          project_manager: "Wilson, Mark"
        }
      }
    },

    formatters: "{}",
    options: {
      cacheReport: true,
      convertTo: "pdf",
      overwrite: true,
      reportName: "test_report"
    },
    template: {
      content: "SGVsbG8sIHtkLmRhdGEucHJvamVjdC5wcm9qZWN0X21hbmFnZXJ9",
      encodingType: "base64",
      fileType: "txt"
    },
  };

  // Additional required config  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axiosInstance.post('/template/render', body, config)
      .then((response) => {
        console.log("RESPONSE:", response.data);
        //return response.data;
        // // create file link in browser's memory
        // const href = URL.createObjectURL(response.data);
        

        // // create "a" HTML element with href to file & click
        // const link = document.createElement('a');
        // link.href = href;
        // link.setAttribute('download', 'file.pdf'); //or any other extension
        // document.body.appendChild(link);
        // link.click();

        // // clean up "a" element & remove ObjectURL
        // document.body.removeChild(link);
        // URL.revokeObjectURL(href);

        
        reply
        .headers({
          'Content-Type':'application/pdf',
          "Content-Disposition": "attachment; filename=\"test_request.pdf\""
        })
        .send(response.data);
      });
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = controller;
