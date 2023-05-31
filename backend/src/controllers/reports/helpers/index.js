// Utility imports
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

// Constants
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
      data: ${data},
    `);
  }
  return data;
};
//TODO: write an adapter function that takes an argument from the controller that says
// if whether we want to export to pdf or xls, and whether we have a .docx or .xlsx template
// that adaptor function will then call `getDocumentApiBody` with the appropriate arguments, and
// we can leave getDocumentApiBody mostly alone

const getDocumentApiBody = async (
  data,
  templateFileName,
  templateType = "docx",
  reportName = "report",
  convertTo = "pdf"
) => {
  const REPORT_FILETYPES = ["docx", "xlsx", "pdf"];
  const TEMPLATE_FILETYPES = ["docx", "xlsx"];
  const OUTPUT_MAP = {
    docx: "pdf",
    xlsx: "xlsx",
  };

  // return early if wrong template type is sent.
  if (!TEMPLATE_FILETYPES.includes(templateType)) {
    return null;
  }

  // decide whether to export an XLSX or PDF
  const templatePath = `../../../../reports/${templateType}/${templateFileName}`;
  const outputFormat = OUTPUT_MAP[templateType];
  const templateContent = await loadTemplate(path.resolve(__dirname, templatePath));

  console.log(`
    templateFileName: ${templateFileName},
    templatePath: ${templatePath},
    templateType: ${templateType},
    outputFormat: ${outputFormat},
  `);

  return {
    data: data,
    formatters:
      '{"formatMoney":"_function_formatMoney|function(data) { return data.toFixed(2); }"}',
    options: {
      cacheReport: true,
      convertTo: outputFormat,
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

const getReport = async (request, reply) => {
  reply.type("application/pdf").headers({
    "Content-Disposition": 'attachment;filename="test.pdf"',
  });

  return request.data;
};

/**
 * Separates an array of projects into groups by property.
 *
 * this moves each array of projects onto "projects" key, and the property onto a {property} key
 * the Carbone.io engine needs to see objects nested in arrays, or arrays nested in objects, or else it can't iterate through.
 * arrays inside of arrays, or objects inside of objects can't be iterated properly (at depth n+1)
 *
 * @param   {any[]}   rows Array of projects ordered by some property.
 * @param   {string}  prop string matches property name we want to group the rows by
 * @returns {any[][]}
 */
const groupByProperty = (rows, prop) => {
  if (_.isEmpty(rows)) return rows;

  const sliceOneGroup = (value, key) => ({
    [prop]: key,
    projects: [...value],
  });
  const rowsByProp = _.groupBy(rows, prop);

  return _.map(rowsByProp, sliceOneGroup);
};

module.exports = {
  getDocumentApiBody,
  getReport,
  groupByProperty,
  loadTemplate,
  pdfConfig,
};
