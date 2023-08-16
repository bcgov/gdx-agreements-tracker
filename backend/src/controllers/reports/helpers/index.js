// Utility imports
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

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

  // grab template file contents and encode it
  const templateContent = await loadTemplate(
    path.resolve(__dirname, `../../../../reports/${templateType}/${templateFileName}`)
  );

  return {
    data,
    formatters:
      '{"formatMoney":"_function_formatMoney|function(data) { return data.toFixed(2); }"}',
    options: {
      cacheReport: true,
      convertTo: templateMap[templateType],
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
 * Groups items in a list by a specified property.
 *
 * @param   {Array}  list  - The list of items to be grouped.
 * @param   {string} group - The property name to group the items by. Default is "portfolio_name".
 * @returns {Array}        An array of objects, where each object represents a group and its associated items.
 *                         Each object has two properties: the specified 'group' property (key) and the array of items (value).
 */
const groupByProperty = (list = [], group = "portfolio_name") => {
  // Using lodash's chain function "_" to create a chainable sequence.
  // The input 'list' is wrapped in the chain and will be operated upon.
  const result = _(list)
    // Group the items in the list by the specified 'group' property.
    .groupBy(group)
    // After grouping, 'map' is used to convert the grouped items into a new format.
    .map((projects, key) => ({
      // The 'key' represents the value of the property used for grouping (e.g., portfolio_name).
      // Create an object with the 'group' property as the key (e.g., { portfolio_name: 'some_group_value' }).
      [group]: key,
      // The 'projects' represent an array containing all the items belonging to this group.
      // Add the 'projects' array as the value in the new object.
      projects,
    }))
    // 'value' is used to extract the final result from the lodash chain.
    .value();

  // Return the resulting array of grouped objects.
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

/**
 * Gets a report with subtotals.
 * Can be used to 'fold in' subtotals for financial reports or other reports that have subtotals.
 * This also handles grouping the report by a specified property: 'propertyToGroupBy'.
 *
 * @param   {Array}         report            - The report data.
 * @param   {Array}         subtotals         - The report subtotal data.
 * @param   {string}        propertyToGroupBy - The property to group the report data by.
 * @returns {Object<Array>}                   An array of report objects with subtotals added.
 */
const getReportWithSubtotals = async (report, subtotals, propertyToGroupBy) => {
  const groupedReport = groupByProperty(report, propertyToGroupBy);
  const keyedSubtotals = _.keyBy(subtotals, propertyToGroupBy);

  return _.reduce(
    groupedReport,
    (reportWithSubtotals, report) => {
      const projectName = _.chain(report.projects).head().get("project_name", "").value();
      const reportSubtotals = keyedSubtotals[report[propertyToGroupBy]];

      return [
        ...reportWithSubtotals,
        {
          project_name: projectName,
          ...report,
          subtotals: reportSubtotals,
        },
      ];
    },
    // initial value - empty array to hold the report with subtotals as it accumulates a new report with each reduce iteration
    []
  );
};

module.exports = {
  getCurrentDate,
  getDocumentApiBody,
  getReport,
  getReportAndSetRequestHeaders,
  getReportWithSubtotals,
  groupByProperty,
  loadTemplate,
  pdfConfig,
  validateQueryParameters,
};
