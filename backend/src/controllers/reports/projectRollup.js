const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/projectRollup");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const _ = require("lodash");

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const pdfConfig = utils.pdfConfig;
const getDocumentApiBody = utils.getDocumentApiBody;
controller.getReport = utils.getReport;

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

    if (!_.isEmpty(result.rollup)) {
      result.rollup = { portfolios: groupByPortfolio(result.rollup, "portfolio_name") };
    }

    const body = await getDocumentApiBody(result, "PA_StatusPortfolioRollup_template.docx");

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
    reply.code(500);
    console.error(`
    ERROR:
    ${err}
    `);
    return { message: `There was a problem looking up this Project rollup Report.` };
  }
};

/**
 * Separates an array of projects into groups by their portfolio.
 *
 * this moves each array of projects onto a "projects" key, and the portfolio name onto a "portfolio" key
 * the Carbone.io engine needs to see objects nested in arrays, or arrays nested in objects, or else it can't iterate through.
 * arrays inside of arrays, or objects inside of objects can't be iterated properly (at depth n+1)
 *
 * @param   {any[]}   rows Array of projects ordered by portfolio.
 * @param   {string}  prop string matches property name we want to group the rows by
 * @returns {any[][]}
 */
const groupByPortfolio = (rows, prop) => {
  const rowsByPortfolio = _.groupBy(rows, prop);
  const portfolioGroup = _.map(rowsByPortfolio, (value, key) => {
    return {
      portfolio_name: key,
      projects: [...value],
    };
  });

  return portfolioGroup;
};

module.exports = controller;
