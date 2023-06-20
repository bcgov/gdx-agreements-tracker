// Libraries
const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const cdogs = useCommonComponents("cdogs");

// Utilities
const {
  getDocumentApiBody,
  getReportAndSetRequestHeaders,
  pdfConfig,
  validateQueryParameters,
  getCurrentDate,
} = require("./helpers");

// Constants
const what = { single: "report", plural: "reports" };

/**
 *
 * USING THIS CONTROLLER:
 *
 * How to change the route: (pseudocode)
 * EXAMPLE ROUTE: backend/src/routes/reports/Tab_50_rpt_PF_NetRecoverySummaryByQuarter.js
 *
 * const getControllerFrom = require("@controllers/reports/genericReportController");
 * const name = `{whatever your report name is}`;
 * const controller = getControllerFrom(name);
 *
 * How to change the model: (export the data instead of the query - pseudocode)
 * EXAMPLE MODEL: backend/src/models/reports/Tab_50_rpt_PF_NetRecoverySummaryByQuarter.js
 *
 * async({some named parameter(s)}) => {
 * const [{all the data for the report }] = await Promise.all([
 * {list of the knex query promises}
 * ]);
 *
 * return {
 * <all the data for your report, organized into whatever structure you need>
 * < you can use `groupByProperty()` from from helpers to add structure for reports 'by fiscal' or 'by portfolio'>
 * }}
 *
 */

/**
 * Retrieves a controller from the specified filename.
 *
 * @param   {string} filename - The name of the file.
 * @returns {object}          - The controller object.
 */
const getControllerFrom = (filename) => {
  const model = require(`@models/reports/${filename}`);
  const controller = useController(model, what);

  const getReport = getReportAndSetRequestHeaders();

  const reportHandler = async (request, reply) => {
    controller.userRequires(request, "PMO-Reports-Capability", reply);

    try {
      const { query } = request;
      const { templateType } = validateQueryParameters(query);
      const modifiedGetReport = getReportAndSetRequestHeaders(templateType);
      controller.getReport = modifiedGetReport;

      const result = await getDataFromModel(query, model);
      await sendToCdogs({ result, filename, templateType, request });

      if (result) {
        return result;
      } else {
        return controller.noQuery(reply, `There was a problem looking up this Report.`);
      }
    } catch (err) {
      return controller.failedQuery(reply, err, what);
    }
  };

  return {
    ...controller,
    getReport,
    [filename]: reportHandler,
  };
};

/**
 * Retrieves data from a model based on fiscal or portfolio information.
 *
 * @param   {string|Array[string]|number} query - The parameters for retrieving data.
 * @param   {object}                      model - The model to retrieve data from.
 * @returns {Promise}                           - A promise that resolves with the retrieved data.
 */
const getDataFromModel = async (query, model) => {
  const result = await model.getAll(query);
  const date = await getCurrentDate();

  return {
    date,
    ...result,
  };
};

/**
 * Sends the result data to Cdogs for rendering a template.
 *
 * @param   {object}  params              - The parameters for sending to Cdogs.
 * @param   {any}     params.result       - The result data to be sent.
 * @param   {string}  params.filename     - The name of the file.
 * @param   {string}  params.templateType - The type of the template.
 * @param   {object}  params.request      - The request object.
 * @returns {Promise}                     - A promise that resolves when the data is sent to Cdogs.
 */
const sendToCdogs = async ({ result, filename, templateType, request }) => {
  const templateFileName = `${filename}.${templateType}`;
  const body = await getDocumentApiBody(result, templateFileName, templateType);
  request.data = await cdogs.api.post("/template/render", body, pdfConfig);
};

module.exports = getControllerFrom;
