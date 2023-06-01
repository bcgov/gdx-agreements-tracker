// Utility imports
const fs = require("fs");
const path = require("path");

// Constants
const pdfConfig = { responseType: "arraybuffer" };
const templateFiletypes = ["docx", "xlsx"];

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

/**
 * Generates the API body for creating a document using the provided data and template.
 * @param {Object} data - The data to be used in the document.
 * @param {string} templateFileName - The name of the template file to use.
 * @param {string} [templateType="docx"] - The type of the template file (default: "docx").
 * @param {string} [reportName="report"] - The name of the report (default: "report").
 * @param {string} [convertTo="pdf"] - The format to convert the document to (default: "pdf").
 * @returns {Object|null} Returns an object containing the API body for creating a document or null if the input is invalid.
 */
const getDocumentApiBody = async (
  data,
  templateFileName,
  templateType = "docx",
  reportName = "report",
  convertTo = "pdf"
) => {
  if (!isValidInput({ templateType, templateFileName })) {
    return null;
  }

  const templatePath = getTemplatePath({ templateType, templateFileName });
  const resolvedTemplatePath = path.resolve(__dirname, templatePath);
  const templateContent = await loadTemplate(resolvedTemplatePath);

  return {
    data,
    formatters:
      '{"formatMoney":"_function_formatMoney|function(data) { return data.toFixed(2); }"}',
    options: {
      cacheReport: true,
      convertTo: getOutputFormat(templateType),
      overwrite: true,
      reportName,
    },
    template: {
      content: templateContent,
      encodingType: "base64",
      fileType: templateType,
    },
  };
};

// helper functions for getDocumentApi()
const isValidInput = ({ templateType, templateFileName }) =>
  templateFiletypes.includes(templateType) &&
  templateFiletypes.includes(templateFileName.slice(-4));

const getTemplatePath = ({ templateType, templateFileName }) =>
  `../../../../reports/${templateType}/${templateFileName}`;

// decide whether to export an XLSX or PDF
const getOutputFormat = (templateType) =>
  ({
    docx: "pdf",
    xlsx: "xlsx",
  }[templateType]);

// apply headers to the request, then return the data
const getReport = async (request, reply) => {
  applyRequestHeaders(reply);
  return request.data;
};

const applyRequestHeaders = (reply) =>
  reply.type("application/pdf").headers({
    "Content-Disposition": 'attachment;filename="test.pdf"',
  });

/**
 * Groups an array of objects by a specified property.
 * @param {Object[]} rows - The array of objects to group.
 * @param {string} prop - The property to group by.
 * @returns {Object[]} Returns an array of objects grouped by the specified property.
 */
const groupByProperty = (rows, prop) => {
  if (rows.length === 0) {
    return rows;
  }

  const groupedRows = rows.reduce((result, row) => {
    const key = row[prop];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(row);
    return result;
  }, {});

  const result = Object.entries(groupedRows).map(([key, value]) => ({
    [prop]: key,
    projects: [...value],
  }));

  return result;
};

module.exports = {
  getDocumentApiBody,
  getReport,
  groupByProperty,
  loadTemplate,
  pdfConfig,
};
