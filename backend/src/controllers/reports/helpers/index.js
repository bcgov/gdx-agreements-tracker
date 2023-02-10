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

const getDocumentApiBody = async (
  data,
  templateFileName,
  templateType = "docx",
  reportName = "report",
  convertTo = "pdf"
) => {
  const templateContent = await loadTemplate(
    path.resolve(__dirname, `../../../../reports/docx/${templateFileName}`)
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
  const propGroup = _.map(rowsByProp, sliceOneGroup);

  return propGroup;
};

module.exports = {
  getDocumentApiBody,
  getReport,
  groupByProperty,
  loadTemplate,
  pdfConfig,
};
