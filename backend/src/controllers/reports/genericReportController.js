const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const cdogs = useCommonComponents("cdogs");
const {
  getCurrentDate,
  getDocumentApiBody,
  getReportAndSetRequestHeaders,
  pdfConfig,
  validateQueryParameters,
  getTemplateFilenameFrom,
} = require("./helpers");

function getControllerFrom(name) {
  const model = require(`@models/reports/${name}`);
  const controller = useController(model, { single: "report", plural: "reports" });
  controller.getReport = getReportAndSetRequestHeaders();
  controller[name] = async (request, reply) => {
    controller.userRequires(request, "PMO-Reports-Capability", reply);
    try {
      const { templateType, fiscal } = validateQueryParameters(request.query);
      controller.getReport = getReportAndSetRequestHeaders(templateType);

      const templateFileName = getTemplateFilenameFrom(name)(templateType);
      const result = await getDataFromModels(fiscal, model);
      await sendToCdogs({ result, templateFileName, templateType, request });

      return result;
    } catch (err) {
      return handleError(err, reply);
    }
  };
  return controller;
}

// helper functions
const handleError = (err, reply) => {
  console.error(`Error: ${err}`);
  reply.code(500);
  return { message: "There was a problem looking up this Report." };
};

const getDataFromModels = async (fiscal, model) => {
  const [date, [{ fiscal_year }], report, report_totals] = await Promise.all([
    getCurrentDate(),
    model.getFiscalYear(fiscal),
    model.Tab_50_rpt_PF_NetRecoverySummaryByQuarter(fiscal),
    model.Tab_50_totals(fiscal),
  ]);

  return {
    date,
    fiscal: fiscal_year,
    report,
    report_totals,
  };
};

// send the body to cdogs and get back the result so it can be downloaded by the client
const sendToCdogs = async ({ result, templateFileName, templateType, request }) => {
  const body = await getDocumentApiBody(result, templateFileName, templateType);
  request.data = await cdogs.api.post("/template/render", body, pdfConfig);
};

module.exports = getControllerFrom;
