// Utility imports
const fs = require("fs");
const path = require("path");

// Constants
const pdfConfig = { responseType: "arraybuffer" };
const validFiletypes = ["xls", "xlsx", "doc", "docx"];
const templateMap = {
  docx: "pdf",
  xlsx: "xlsx",
};
const mimeTypeMap = {
  docx: "application/pdf",
  xlsx: "application/vnd.ms-excel",
};

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
  // exit early if we are passed the wrong template information
  if (!isValidInput({ templateType, templateFileName })) {
    return new Error(`
      template file type or template filename are invalid:
      received template file type: .${templateType}
      received filename: ${templateFileName}
    `);
  }

  const templateContent = await loadTemplate(getTemplatePath({ templateType, templateFileName }));
  const outputFormat = templateMap[templateType];

  return {
    data,
    formatters:
      '{"formatMoney":"_function_formatMoney|function(data) { return data.toFixed(2); }"}',
    options: {
      cacheReport: true,
      convertTo: outputFormat,
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
/**
 * Checks if the input parameters for the template type and file name are valid.
 *
 * @param   {object}  input                  - The input object containing the template type and file name.
 * @param   {string}  input.templateType     - The type of the template.
 * @param   {string}  input.templateFileName - The name of the template file.
 * @returns {boolean}                        - Indicates whether the input is valid or not.
 */
const isValidInput = ({ templateType, templateFileName }) => {
  const isValidFiletype = validFiletypes.some((filetype) => templateFileName.includes(filetype));
  const isValidTemplateType = validFiletypes.some((filetype) => templateType === filetype);

  return isValidFiletype && isValidTemplateType;
};

/**
 * Returns the absolute path to a template file based on the provided template type and file name.
 *
 * @param   {object} options                  - The options object.
 * @param   {string} options.templateType     - The type of the template.
 * @param   {string} options.templateFileName - The name of the template file.
 * @returns {string}                          - The absolute path to the template file.
 */
const getTemplatePath = ({ templateType, templateFileName }) =>
  path.resolve(__dirname, `../../../../reports/${templateType}/${templateFileName}`);

/**
 * Returns a function that retrieves the header information based on the specified template type and sets the response headers accordingly.
 *
 * @param   {string}   templateType - The type of template (default: "docx").
 * @returns {Function}              - An asynchronous function that sets the response type and headers and returns the request data.
 */
const getReportAndSetRequestHeaders = (templateType = "docx") => {
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: add mimeType back in, currently it is always application/pdf
  const { headers } = getHeaderInfoFrom(templateType);

  const setResponseHeaders = (reply) => {
    //reply.type(mimeType) //This doesn't seem to be working, and it also causing tests to fail (ST).
    reply.headers(headers);
  };

  return async (request, reply) => {
    setResponseHeaders(reply);
    return request.data;
  };
};

/**
 * Retrieves the header information based on the provided template type.
 *
 * @param    {string} [templateType="docx"] - The type of the template.
 * @returns  {object}                       - The header information object containing the filename and MIME type.
 * @property {object} headers               - The header string containing the filename
 * @property {string} mimeType              - The MIME type of the file.
 */
const getHeaderInfoFrom = (templateType = "docx") => {
  const filename = `test.${templateType}`;
  const mimeType = mimeTypeMap[templateType];

  return {
    headers: {
      "Content-Disposition": `attachment;filename="${filename}`,
    },
    mimeType,
  };
};

/* Retrieves the header information based on the provided template type and sets the request headers for the report.
 * this handles reports which have not excel export option.
 */
const getReport = getReportAndSetRequestHeaders();

/**
 * Groups the items in the provided list based on the specified property.
 *
 * @param   {Array}  list  - The array of items to be grouped.
 * @param   {string} group - The property name used for grouping the items (defaults to "portfolio_name").
 * @returns {Array}        An array of objects, each containing a group name and its corresponding projects.
 */
const groupByProperty = (list = [], group = "portfolio_name") => {
  const groupedItems = list.reduce((acc, item) => {
    const groupValue = item[group];

    // Create a new object for the accumulator with the current item added to the appropriate group
    return {
      ...acc,
      [groupValue]: [...(acc[groupValue] ??= []), item],
    };
  }, {});

  // Convert the grouped object into an array of objects with group names and projects
  const result = Object.entries(groupedItems).map(([key, projects]) => ({
    [group]: key,
    projects,
  }));

  return result;
};

/**
 * Validates the query parameters and returns an object with the validated values.
 * Work in progress - we can add new params and new defaults as the requirements change.
 *
 * @param   {object}                 params              - The parameters object containing the query parameters.
 * @param   {string}                 params.templateType - The template type query parameter. Defaults to "docx".
 * @param   {string}                 params.outputType   - The output type query parameter. Defaults to "pdf".
 * @param   {number}                 params.fiscal       - The fiscal year parameter for reports. defaults to 0 in case it is not provided as an argument
 * @param   {string | Array(string)} params.portfolio    - The portfolio(s)parameter for reports. defaults to 0 in case it is not provided as an argument
 * @returns {object}                                     - An object containing the validated templateType and outputType values.
 */
const validateQueryParameters = ({
  fiscal = 0,
  portfolio = null,
  templateType = "docx",
  outputType = "pdf",
}) => {
  if (!validFiletypes.includes(templateType)) {
    throw new Error("Query parameter is invalid!");
  }
  return { fiscal, portfolio, templateType, outputType };
};
/**
 * Get the current date in the Vancouver timezone
 * the date is in ISO "YYYY-MM-DD" format
 *
 * @returns {string} - current Vancouver date in ISO format
 */
const getCurrentDate = async () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: "America/Vancouver" }))
    .toISOString()
    .split("T")[0];

module.exports = {
  getDocumentApiBody,
  getReport,
  groupByProperty,
  loadTemplate,
  pdfConfig,
  validateQueryParameters,
  getCurrentDate,
  getReportAndSetRequestHeaders,
};
