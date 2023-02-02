const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/projectRollup");
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
    console.error(`
      error: ${err},
      path: ${path},
      data: ${path},
    `);
  }
  return data;
};

const getDocumentApiBody = async (
  data,
  templateFileName,
  templateType = "docx",
  reportName = "report",
  //convertTo = "pdf"
  convertTo = "docx"
) => {
  const templateContent = await loadTemplate(
    path.resolve(__dirname, `../../../reports/${templateFileName}`)
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

    if (result.rollup.length > 0) {
      result.rollup = { portfolios: groupByPortfolio(result.rollup) };
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
    ERROR:
    ERROR:
    ERROR:
    ERROR:
    ERROR: ${err}
    `)
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
  const portfolioGroup = [];

  const projectsKeyedByPortfolioName = rows.reduce(
    (acc, row) => {
      const key = row.portfolio_name;
      const curGroup = acc[key] ?? [];

      // this returns an object where the key is the portfolio name
      // and the value is an array of projects belonging to that portfolio name
      return ({ ...acc, [key]: [...curGroup, row] });
    },
    {}
  );

  // this moves each array of projects onto a "projects" key, and the portfolio name onto a "portfolio" key
  // the Carbone.io engine needs to see objects nested in arrays, or arrays nested in objects, or else it can't iterate through.
  // arrays inside of arrays, or objects inside of objects can't be iterated properly (at depth n+1)
  for (let property in projectsKeyedByPortfolioName) {
    portfolioGroup.push({
      "portfolio_name": property,
      "projects": [...projectsKeyedByPortfolioName[property]]
    });
  }

  return portfolioGroup;
};
module.exports = controller;
