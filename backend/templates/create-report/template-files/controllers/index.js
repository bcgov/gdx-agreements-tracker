const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/$reportName");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const {
  getCurrentDate,
  getDocumentApiBody,
  getReportAndSetRequestHeaders,
  // uncomment below if you need your results in sections, such as portfolio)
  // groupByProperty,
  pdfConfig,
  validateQueryParameters,
} = utils;

// default request headers for the cdogs api will use 'pdf' mimetype and 'docx' template file type
controller.getReport = getReportAndSetRequestHeaders();

/**
 * Generates a $reportName report
 *
 * @param   {object} request - The request object containing query parameters.
 * @param   {object} reply   - The reply object for sending the response.
 * @returns {object}         - The generated $reportName report.
 * @throws {Error} - If there is an error generating the report.
 */
controller.$reportName = async (request, reply) => {
  controller.userRequires(request, "PMO-Reports-Capability", reply);
  // early exit if invalid query info provided
  try {
    const { templateType } = validateQueryParameters(request.query);

    // based on the template type, pick which headers and the template filename
    controller.getReport = getReportAndSetRequestHeaders(templateType);
    const templateFileName = `$reportName.${templateType}`;

    // get data from models

    // shape model data into format the carbone engine can parse

    const result = {
      current_date: await getCurrentDate(),
    };

    // send the body to cdogs and get back the result so it can be downloaded by the client
    const body = await getDocumentApiBody(result, templateFileName, templateType);
    request.data = await cdogs.api.post("/template/render", body, pdfConfig);

    return result;
  } catch (err) {
    console.error(`ERROR: ${err}`);
    reply.code(500);
    return { message: "There was a problem looking up this $reportName Report." };
  }
};

module.exports = controller;
