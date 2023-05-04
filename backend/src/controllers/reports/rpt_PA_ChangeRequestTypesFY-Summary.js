const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/rpt_PA_ChangeRequestTypesFYSummary");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const _ = require("lodash");

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig, groupByProperty } = utils;

controller.getReport = getReport;

/**
 * Get a Change Request by fiscal year Summary Report for a specific fiscal year range.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.rpt_PA_ChangeRequestTypesFYSummary = async (request, reply) => {
  controller.userRequires(request, "PMO-Reports-Capability", reply);
  try {
    // Get the data from the database.
    const changeRequestTypes = await model.changeRequestTypes(request.query);
    // Lay out final JSON body for api call to cdogs server
    const result = {
      changeRequestTypes: changeRequestTypes?.rows,
    };

    const body = await getDocumentApiBody(result, "rpt_PA_ChangeRequestTypesFY-Summary.docx");
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
    return { message: `There was a problem looking up this change request types by fy Report.` };
  }
};

module.exports = controller;
