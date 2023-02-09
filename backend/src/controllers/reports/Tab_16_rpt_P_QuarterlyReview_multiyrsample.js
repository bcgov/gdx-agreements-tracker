const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/projectRollup");
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
controller.Tab_16_rpt_P_QuarterlyReview_multiyrsample = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    // Get the data from the database.
    const getDate = async () => new Date();

    //TODO replace "variableName" with proper variable and "variableName2" with variable to pass if needed.  The Model is already correct.
    let variableName = await model.Tab_16_rpt_P_QuarterlyReview_multiyrsample("variableName2");

    const result = {
      report_date: await getDate(),
      result: groupByProperty(variableName, "PROPERTY TO GROUP BY"), //TODO this is where result would go
    };

    const body = await getDocumentApiBody(
      result,
      "Tab_16_rpt_P_QuarterlyReview_multiyrsample.docx"
    );
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
