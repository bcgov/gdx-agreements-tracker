const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_50_rpt_PF_NetRecoverySummaryByQuarter");
const utils = require("./helpers");
const controller = useController(model, { single: "report", plural: "reports" });

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const {
  getCurrentDate,
  getDocumentApiBody,
  getReportAndSetRequestHeaders,
  pdfConfig,
  validateQuery,
} = utils;

// default request headers for the cdogs api will use 'pdf' mimetype and 'docx' template file type
controller.getReport = getReportAndSetRequestHeaders();

/**
 * Generates a net recovery summary report for Tab 50.
 *
 * @param   {object} request - The request object containing query parameters.
 * @param   {object} reply   - The reply object for sending the response.
 * @returns {object}         - The generated finance recovery summary report.
 * @throws {Error} - If there is an error generating the report.
 */
controller.Tab_50_rpt_PF_NetRecoverySummaryByQuarter = async (request, reply) => {
  controller.userRequires(request, "PMO-Reports-Capability", reply);
  // early exit if invalid query info provided
  try {
    const { templateType, fiscal } = validateQuery(request.query);
    const { getFiscalYear, Tab_50_rpt_PF_NetRecoverySummaryByQuarter, Tab_50_totals } = model;

    // based on the template type, pick which headers and the template filename
    controller.getReport = getReportAndSetRequestHeaders(templateType);
    const templateFileName = `Tab_50_rpt_PF_FinanceRecoverySummaryByQuarter.${templateType}`;

    // get data from models
    const [date, [{ fiscal_year }], report, report_totals] = await Promise.all([
      getCurrentDate(),
      getFiscalYear(fiscal),
      Tab_50_rpt_PF_NetRecoverySummaryByQuarter(fiscal),
      Tab_50_totals(fiscal),
    ]);
    // shape model data into format the carbone engine can parse
    const result = {
      date,
      fiscal: fiscal_year,
      report,
      report_totals,
    };

    // send the body to cdogs and get back the result so it can be downloaded by the client
    const body = await getDocumentApiBody(result, templateFileName, templateType);
    request.data = await cdogs.api.post("/template/render", body, pdfConfig);

    return result;
  } catch (err) {
    console.error(`ERROR: ${err}`);
    reply.code(500);
    return { message: "There was a problem looking up this Report." };
  }
};

module.exports = controller;
