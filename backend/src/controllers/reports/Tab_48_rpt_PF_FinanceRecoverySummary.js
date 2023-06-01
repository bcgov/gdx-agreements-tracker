const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_48_rpt_PF_FinanceRecoverySummary");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const _ = require("lodash");

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig, groupByProperty, validateQuery, getCurrentDate } =
  utils;
controller.getReport = getReport;

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
  try {
    const { templateType, fiscal } = validateQuery(request.query);
    const templateFileName = `Tab_48_rpt_PF_FinanceRecoverySummary.${templateType}`;

    // get data from models
    const [fiscalYear] = await model.getFiscalYear(fiscal);
    const [report, report_totals, report_grand_totals] = await Promise.all([
      model.Tab_48_rpt_PF_FinanceRecoverySummary(fiscal),
      model.Tab_48_totals(fiscal),
      model.Tab_48_grand_totals(fiscal),
    ]);

    // shape model data into format the carbone engine can parse
    const reportByPortfolio = groupByProperty(report, "portfolio_name");
    const reportsByPortfolioWithTotals = reportByPortfolio.map((portfolio) => ({
      ...portfolio,
      portfolio_totals: _.keyBy(report_totals, "portfolio_name")[portfolio.portfolio_name],
    }));

    const result = {
      date: await getCurrentDate(),
      fiscal: fiscalYear.fiscal_year,
      report: reportsByPortfolioWithTotals,
      grand_totals: _.first(report_grand_totals),
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
