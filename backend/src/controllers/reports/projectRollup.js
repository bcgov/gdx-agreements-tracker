const useController = require("../useController/index");
const model = require("@models/reports/projectRollup");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);

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
    if (result.rollup.length > 0) {
      result.rollup = groupByPortfolio(result.rollup);
    }
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
