const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_34_rpt_PA_StatusDashboard");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);

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
controller.Tab_34_rpt_PA_StatusDashboard = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    // Get the data from the database.
    const portfolios = request.query.portfolio;
    const dashboardResults = await model(portfolios);

    // Chunk model info so template engine can parse it
    const dashboardProjectsGroupedByPortfolioName = groupByProperty(
      dashboardResults.rows,
      "portfolio_name"
    );

    // Lay out final JSON body for POST to CDOGS API
    const result = {
      report_date: await (async () => new Date())(),
      dashboard: dashboardProjectsGroupedByPortfolioName,
    };

    const body = await getDocumentApiBody(result, "Tab_34_rpt_PA_StatusDashboard.docx");
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
    return { message: `There was a problem looking up this Project Status Dashboard Report.` };
  }
};

module.exports = controller;
