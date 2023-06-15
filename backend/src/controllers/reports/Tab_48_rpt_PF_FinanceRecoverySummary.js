const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_48_rpt_PF_FinanceRecoverySummary");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const _ = require("lodash");

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const {
  getCurrentDate,
  getDocumentApiBody,
  getReportAndSetRequestHeaders,
  groupByProperty,
  pdfConfig,
  validateQueryParameters,
} = utils;

// default request headers for the cdogs api will use 'pdf' mimetype and 'docx' template file type
controller.getReport = getReportAndSetRequestHeaders();

/**
 * Generates a finance recovery summary report for Tab 48.
 *
 * @param   {object} request - The request object containing query parameters.
 * @param   {object} reply   - The reply object for sending the response.
 * @returns {object}         - The generated finance recovery summary report.
 * @throws {Error} - If there is an error generating the report.
 */
controller.Tab_48_rpt_PF_FinanceRecoverySummary = async (request, reply) => {
  controller.userRequires(request, "PMO-Reports-Capability", reply);
  // early exit if invalid query info provided
  try {
    const { templateType, fiscal } = validateQueryParameters(request.query);
    const {
      getFiscalYear,
      Tab_48_rpt_PF_FinanceRecoverySummary,
      Tab_48_totals,
      Tab_48_grand_totals,
    } = model;

    // based on the template type, pick which headers and the template filename
    controller.getReport = getReportAndSetRequestHeaders(templateType);
    const templateFileName = `Tab_48_rpt_PF_FinanceRecoverySummary.${templateType}`;

    // get data from models
    const [currentDate, [{ fiscal_year }], report, report_totals, [report_grand_totals]] =
      await Promise.all([
        getCurrentDate(),
        getFiscalYear(fiscal),
        Tab_48_rpt_PF_FinanceRecoverySummary(fiscal),
        Tab_48_totals(fiscal),
        Tab_48_grand_totals(fiscal),
      ]);

    // shape model data into format the carbone engine can parse
    const reportByPortfolio = groupByProperty(report, "portfolio_name");
    const reportsByPortfolioWithTotals = reportByPortfolio.map((portfolio) => ({
      ...portfolio,
      portfolio_totals: _.keyBy(report_totals, "portfolio_name")[portfolio.portfolio_name],
    }));

    const result = {
      date: currentDate,
      fiscal: fiscal_year,
      report: reportsByPortfolioWithTotals,
      grand_totals: report_grand_totals,
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
