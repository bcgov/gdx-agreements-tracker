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
 * Get a Project rollup Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.Tab_48_rpt_PF_FinanceRecoverySummary = async (request, reply) => {
  controller.userRequires(request, "PMO-Reports-Capability", reply);

  // determine whether we want to make an XLSx or PDF output
  const {
    query: { templateType },
  } = request;

  const templateFileName = `Tab_48_rpt_PF_FinanceRecoverySummary.${templateType}`;

  try {
    const stringify = JSON.stringify;
    // gets the data from the database
    console.log(stringify(request?.query, null, 2));

    const getDate = async () => new Date();
    const [{ fiscal_year }] = await model.getFiscalYear(request.query);
    const report = await model.Tab_48_rpt_PF_FinanceRecoverySummary(request.query);
    const report_totals = await model.Tab_48_totals(request.query);
    const report_grand_totals = await model.Tab_48_grand_totals(request.query);

    // shape the dataset so it can be parsed by the template rendering engine properly
    const reportByPortfolio = groupByProperty(report, "portfolio_name");
    const totalsByPortfolio = _.keyBy(report_totals, "portfolio_name");
    const reportsByPortfolioWithTotals = _.map(reportByPortfolio, (portfolio) => ({
      ...portfolio,
      portfolio_totals: totalsByPortfolio[portfolio.portfolio_name],
    }));

    const result = {
      date: await getDate(),
      fiscal: fiscal_year,
      report: reportsByPortfolioWithTotals,
      grand_totals: _.first(report_grand_totals),
    };

    //console.log(JSON.stringify(result, null, 2));
    const body = await getDocumentApiBody(result, templateFileName, templateType);

    const exportFile = await cdogs.api.post("/template/render", body, pdfConfig);

    // Inject the pdf data into the request object
    request.data = exportFile;

    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    console.error(`ERROR: ${err}`);
    reply.code(500);
    return { message: `There was a problem looking up this Project rollup Report.` };
  }
};

module.exports = controller;
