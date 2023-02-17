const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_19_rpt_PA_ActiveProjectsbyPortfolio");
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
controller.Tab_19_rpt_PA_ActiveProjectsbyPortfolio = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    // Get the data from the database.
    const portfolios = request.query.portfolio;
    const reportDate = new Date();
    const activeProjects = await model.active_projects(portfolios);
    const activeProjectsGroupedByPortfolioName = groupByProperty(
      activeProjects.rows,
      "portfolio_name"
    );

    const plannedBudgetTotals = await model.planned_budget_totals(portfolios);
    const plannedBudgetTotalsKeyedByPortfolioId = _.keyBy(
      plannedBudgetTotals.rows,
      "portfolio_name"
    );

    const activeProjectsWithBudgetTotals = _.map(
      activeProjectsGroupedByPortfolioName,
      (portfolio) => ({
        ...portfolio,
        total_budget: plannedBudgetTotalsKeyedByPortfolioId[portfolio.portfolio_name].total_budget,
      })
    );

    // shape the results in a 'parseable' way
    const result = {
      report_date: reportDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      active_projects: activeProjectsWithBudgetTotals,
    };

    const body = await getDocumentApiBody(result, "Tab_19_rpt_PA_ActiveProjectsbyPortfolio.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
    console.log(body.data);

    // Inject the pdf data into the request object
    request.data = pdf;

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
