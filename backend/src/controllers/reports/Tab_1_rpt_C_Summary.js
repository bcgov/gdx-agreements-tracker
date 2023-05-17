const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_1_rpt_C_Summary");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig } = utils;
controller.getReport = getReport;

/**
 * Separates an array of projects into groups by a property.
 *
 * @param   {any[]}   rows     Array of projects ordered by the property to be grouped on.
 * @param   {string}  property Object property to group by.
 * @returns {any[][]}
 */
const groupByProperty = (rows, property) => {
  const groupedRows = [];
  let currentValue = rows[0][property];
  let currentGroup = [];
  for (let i = 0; i < rows.length; i++) {
    if (currentValue !== rows[i][property]) {
      groupedRows.push(currentGroup);
      currentValue = rows[i][property];
      currentGroup = [];
    }
    currentGroup.push(rows[i]);
  }
  if (currentGroup.length > 0) {
    groupedRows.push(currentGroup);
  }
  return groupedRows;
};

/**
 * Get a Project rollup Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.Tab_1_rpt_C_Summary = async (request, reply) => {
  controller.userRequires(request, "PMO-Reports-Capability", reply);
  try {
    // Get the data from the database.
    const getDate = async () => new Date();
    const contractId = request.query?.contract;
    // Get the data from the database.
    const result = {
      contract_summary: await model.getContractSummaryReport(contractId),
      contract_amendment: await model.getContractAmendments(contractId),
      contract_invoice: await model.getContractInvoices(contractId),
      report_date: await getDate(),
    };
    if (result.contract_invoice.length > 0) {
      result.contract_invoice = groupByProperty(result.contract_invoice, "fiscal");
      for (let fiscal in result.contract_invoice) {
        const fiscalYear = result.contract_invoice[fiscal][0].fiscal;
        result.contract_invoice[fiscal] = {
          payment_summary: await model.getContractPaymentSummary(contractId, fiscalYear),
          details: result.contract_invoice[fiscal],
        };
      }
    }

    const body = await getDocumentApiBody(result, "Tab_1_rpt_C_Summary.docx");
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
