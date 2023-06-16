const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const cdogs = useCommonComponents("cdogs");
const {
  getDocumentApiBody,
  getReportAndSetRequestHeaders,
  pdfConfig,
  validateQueryParameters,
} = require("./helpers");

/**
 * Retrieves a controller from the specified filename.
 *
 * @param   {string} filename - The name of the file.
 * @returns {object}          - The controller object.
 */
const getControllerFrom = (filename) => {
  const model = require(`@models/reports/${filename}`);
  const controller = useController(model, { single: "report", plural: "reports" });

  return {
    ...controller,
    getReport: getReportAndSetRequestHeaders(),
    [filename]: async (request, reply) => {
      controller.userRequires(request, "PMO-Reports-Capability", reply);
      try {
        const { templateType, fiscal } = validateQueryParameters(request.query);
        controller.getReport = getReportAndSetRequestHeaders(templateType);
        const result = await getDataFromModel({ fiscal, model });
        await sendToCdogs({ result, filename, templateType, request });

        return result;
      } catch (err) {
        console.error(`Error: ${err}`);
        reply.code(500);

        return { message: "There was a problem looking up this Report." };
      }
    },
  };
};

/**
 * Retrieves data from a model based on fiscal or portfolio information.
 *
 * @param   {object}      params           - The parameters for retrieving data.
 * @param   {string|null} params.fiscal    - The fiscal information.
 * @param   {string|null} params.portfolio - The portfolio information.
 * @param   {object}      params.model     - The model to retrieve data from.
 * @returns {Promise}                      - A promise that resolves with the retrieved data.
 */
const getDataFromModel = async ({ fiscal = null, portfolio = null, model }) => {
  // we can add different cases as we go along. for now, let's just think about reports by fiscal or portfolio
  if (fiscal) {
    return await model.getAllByFiscal(fiscal);
  }
  if (portfolio) {
    return await model.getAllByPortfolio(fiscal);
  }
  // simply add a method to the model if you want to getAllBy(x)
};

// eslint-disable-next-line jsdoc/check-line-alignment
/**
 *  Sends the result data to Cdogs for rendering a template.
 *
 *  @param   {object}  params              - The parameters for sending to Cdogs.
 *  @param   {any}     params.result       - The result data to be sent.
 *  @param   {string}  params.filename     - The name of the file.
 *  @param   {string}  params.templateType - The type of the template.
 *  @param   {object}  params.request      - The request object.
 *  @returns {Promise}                     - A promise that resolves when the data is sent to Cdogs.
 */
const sendToCdogs = async ({ result, filename, templateType, request }) => {
  const templateFileName = `${filename}.${templateType}`;
  const body = await getDocumentApiBody(result, templateFileName, templateType);
  request.data = await cdogs.api.post("/template/render", body, pdfConfig);
};

module.exports = getControllerFrom;
