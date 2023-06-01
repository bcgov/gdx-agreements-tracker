const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_48_rpt_PF_FinanceRecoverySummary");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const _ = require("lodash");

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig, groupByProperty } = utils;
controller.getReport = getReport;

/**
 * Generates a finance recovery summary report for Tab 48.
 *
 * @param {Object} request - The request object containing query parameters.
 * @param {Object} reply - The reply object for sending the response.
 * @returns {Object} - The generated finance recovery summary report.
 * @throws {Error} - If there is an error generating the report.
 */
controller.Tab_48_rpt_PF_FinanceRecoverySummary = async (request, reply) => {
  try {
    controller.userRequires(request, "PMO-Reports-Capability", reply);

    const { templateType } = request.query;
    const templateFileName = `Tab_48_rpt_PF_FinanceRecoverySummary.${templateType}`;

    const [fiscalYear] = await model.getFiscalYear(request.query);
    const [report, report_totals, report_grand_totals] = await Promise.all([
      model.Tab_48_rpt_PF_FinanceRecoverySummary(request.query),
      model.Tab_48_totals(request.query),
      model.Tab_48_grand_totals(request.query),
    ]);

    const reportByPortfolio = groupByProperty(report, "portfolio_name");
    const reportsByPortfolioWithTotals = reportByPortfolio.map((portfolio) => ({
      ...portfolio,
      portfolio_totals: _.keyBy(report_totals, "portfolio_name")[portfolio.portfolio_name],
    }));

    const result = {
      date: new Date(),
      fiscal: fiscalYear.fiscal_year,
      report: reportsByPortfolioWithTotals,
      grand_totals: _.first(report_grand_totals),
    };

    const body = await getDocumentApiBody(result, templateFileName, templateType);
    const exportFile = await cdogs.api.post("/template/render", body, pdfConfig);

    request.data = exportFile;

    return result;
  } catch (err) {
    console.error(`ERROR: ${err}`);
    reply.code(500);
    return { message: "There was a problem looking up this rollup Report." };
  }
};

module.exports = controller;
