const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/rpt_PA_Ministry");
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
controller.rpt_PA_Ministry = async (request, reply) => {
  controller.userRequires(request, "PMO-Reports-Capability", reply);
  try {
    // Get the data from the database.
    const projectSummary = await model.rpt_PA_Ministry(request.query);
    const projectSummaryByMinistry = groupByProperty(projectSummary, "ministry_name");
    const projectSummaryFiscal = await model.getFiscalYear(request.query);
    const fiscalYear = _.first(projectSummaryFiscal)?.["fiscal_year"];
    const projectsPerMinistry = await model.projectsAndBudgetsPerMinistry(request.query);
    const projectsPerMinistryKeyedByMinistryName = _.keyBy(projectsPerMinistry, "ministry_name");
    const reportTotals = await model.reportTotals(request.query);
    const reportTotalCount = _.first(reportTotals).total_projects;
    const reportTotalBudget = _.first(reportTotals).total_budget;

    const projectSummaryByMinistryWithBudgetsAndNumberOfProjects = _.map(
      projectSummaryByMinistry,
      (ministry) => ({
        ...ministry,
        total_per_ministry:
          null === ministry.ministry_id
            ? projectsPerMinistryKeyedByMinistryName[" "].total_per_ministry
            : projectsPerMinistryKeyedByMinistryName[ministry.ministry_name].total_per_ministry,
        number_of_projects:
          projectsPerMinistryKeyedByMinistryName[ministry.ministry_name].number_of_projects,
      })
    );

    // Lay out final JSON body for api call to cdogs server
    const result = {
      fiscal_year: fiscalYear,
      ministries: projectSummaryByMinistryWithBudgetsAndNumberOfProjects,
      total_projects: reportTotalCount,
      total_budget: reportTotalBudget,
    };

    // Inject the pdf data into the request object
    const body = await getDocumentApiBody(result, "rpt_PA_Ministry.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
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
    return { message: `There was a problem looking up this Report.` };
  }
};

module.exports = controller;
