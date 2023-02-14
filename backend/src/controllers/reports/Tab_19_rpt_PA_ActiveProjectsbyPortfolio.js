const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_19_rpt_PA_ActiveProjectsbyPortfolio");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig } = utils;
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
    const { query, planned_budget_totals } = model.Tab_19_rpt_PA_ActiveProjectsbyPortfolio;
    const activeProjects = await query(portfolios);
    const activeProjectsPlannedBudgetTotals = await planned_budget_totals(portfolios);

    const result = {
      report_date: reportDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      activeProjects: activeProjects,
      activeProjectsPlannedBudgetTotals: activeProjectsPlannedBudgetTotals,
    };

    const body = await getDocumentApiBody(result, "Tab_19_rpt_PA_ActiveProjectsbyPortfolio.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);

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
