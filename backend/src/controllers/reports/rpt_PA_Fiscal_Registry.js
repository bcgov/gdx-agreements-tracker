const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/rpt_PA_Fiscal_Registry");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const _ = require("lodash");

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig, groupByProperty } = utils;

controller.getReport = getReport;

/**
 * Get a Fiscal Registry Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.rpt_PA_Fiscal_Registry = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    const fiscalRegistry = await model.fiscalRegistry(request.query);
    const plannedBudgetTotals = await model.planned_budget_totals(request.query);
    const reportTotal = await model.report_total(request.query);

    const fiscalRegistryGroupedByPortfolioName = groupByProperty(fiscalRegistry, "portfolio_name");
    const plannedBudgetTotalsKeyedByPortfolioId = _.keyBy(plannedBudgetTotals, "portfolio_name");

    const fiscalRegistryBudgetTotals = _.map(fiscalRegistryGroupedByPortfolioName, (portfolio) => ({
      ...portfolio,
      total_budget: plannedBudgetTotalsKeyedByPortfolioId[portfolio.portfolio_name].total_budget,
    }));

    const reportTotalRow = _.first(reportTotal).total_budget;

    // Lay out final JSON body for api call to cdogs server
    const result = {
      fiscalRegistry: fiscalRegistryBudgetTotals,
      total: reportTotalRow,
    };

    const body = await getDocumentApiBody(result, "rpt_PA_Fiscal_Registry.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);

    // Inject the pdf data into the request object
    request.data = pdf;

    if (!fiscalRegistry) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return fiscalRegistry;
    }
  } catch (err) {
    console.error(`ERROR: ${err}`);
    reply.code(500);
    return { message: `There was a problem looking up this Fiscal Registry Report.` };
  }
};

module.exports = controller;
