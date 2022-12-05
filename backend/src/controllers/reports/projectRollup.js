const useController = require("../useController/index");
const useCommonComponents = require("../useCommonComponents/index");
const model = require("@models/reports/projectRollup");
const projectModel = require("@models/projects");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
// Template and data reading
const fs = require("fs");
const path = require("path");

const cdogs = useCommonComponents("cdogs");
const pdfConfig = { responseType: "arraybuffer" };

/**
 * Reads a file and encodes it to the specified format
 *
 * @param   {string} path     The path of the file to read
 * @param   {string} encoding The format with which to encode the file contents
 * @returns {string}
 */
const loadTemplate = async (path, encoding = "base64") => {
  let data;
  try {
    data = await fs.readFileSync(path);
    data = data.toString(encoding);
  } catch (err) {
    alert(err); // TODO: more graceful error reporting
  }
  return data;
};

const getDocumentApiBody = async (
  data,
  templateFileName,
  templateType = "docx",
  reportName = "report",
  convertTo = "pdf"
) => {
  const templateContent = await loadTemplate(
    path.resolve(__dirname, `../../reports/${templateFileName}`)
  );
  return {
    data: data,
    formatters:
      '{"formatMoney":"_function_formatMoney|function(data) { return data.toFixed(2); }"}',
    options: {
      cacheReport: true,
      convertTo: convertTo,
      overwrite: true,
      reportName: reportName,
    },
    template: {
      content: templateContent,
      encodingType: "base64",
      fileType: templateType,
    },
  };
};

/**
 * Get a Project rollup Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectStatusRollup = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    const portfolios = request.query.portfolio;
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      rollup: await model.getRollupByPortfolios(portfolios),
      report_date: reportDate,
    };
    result.rollup = groupByPortfolio(result.rollup)
    // todo: Uncomment when template document is created.
    // const body = await getDocumentApiBody(result, "PA_Statusrollup_template.docx");
    // const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
    // request.data = pdf;
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    console.log('err', err)
    reply.code(500);
    return { message: `There was a problem looking up this Project rollup Report.` };
  }
};

/**
 * Separates an array of projects into groups by their portfolio.
 *
 * @param   {any[]}   rows Array of projects ordered by portfolio.
 * @returns {any[][]}
 */
const groupByPortfolio = (rows) => {
  const groupedRows = [];
  let currentPortfolio = rows[0].portfolio_id;
  let currentGroup = [];
  for (let i = 0; i < rows.length; i++) {
    if (currentPortfolio !== rows[i].portfolio_id) {
      groupedRows.push(currentGroup);
      currentPortfolio = rows[i].portfolio_id;
      currentGroup = [];
    }
    currentGroup.push(rows[i]);
  }
  if (currentGroup.length > 0) {
    groupedRows.push(currentGroup);
  }
  return groupedRows;
};
module.exports = controller;
