// Utility imports
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

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
 *
 * @param   {object}        data                  - The data to be used in the document.
 * @param   {string}        templateFileName      - The name of the template file to use.
 * @param   {string}        [templateType="docx"] - The type of the template file (default: "docx").
 * @returns {object | null}                       Returns an object containing the API body for creating a document or null if the input is invalid.
 */
const getDocumentApiBody = async (data, templateFileName, templateType = "docx") => {
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
      reportName: templateFileName,
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
 *
 * @param   {object[]} rows - The array of objects to group.
 * @param   {string}   prop - The property to group by.
 * @returns {object[]}      Returns an array of objects grouped by the specified property.
 */
const groupByProperty = (rows, prop) =>
  _.isEmpty(rows)
    ? rows
    : _.map(_.groupBy(rows, prop), (value, key) => ({
        [prop]: key,
        projects: [...value],
      }));

/**
 * Validates the query parameters and returns an object with the validated values.
 * Work in progress - we can add new params and new defaults as the requirements change.
 *
 * @param   {object} params              - The parameters object containing the query parameters.
 * @param   {string} params.templateType - The template type query parameter. Defaults to "docx".
 * @param   {string} params.outputType   - The output type query parameter. Defaults to "pdf".
 * @param   {number} params.fiscal       - The fiscal year parameter for reports. defaults to 0 in case it is not provided as an argument
 * @returns {object}                     - An object containing the validated templateType and outputType values.
 */
const validateQuery = ({ fiscal = 0, templateType = "docx", outputType = "pdf" }) => {
  return {
    fiscal,
    templateType,
    outputType,
  };
};

// gets the current date in ISO "YYYY-MM-DD" format.
const getCurrentDate = async () => new Date().toISOString().split("T")[0];

module.exports = {
  getDocumentApiBody,
  getReport,
  groupByProperty,
  loadTemplate,
  pdfConfig,
  validateQuery,
  getCurrentDate,
};

// todo
// * application/xls
// * add a function in helpers to return a date string
