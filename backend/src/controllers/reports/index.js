const useController = require("../useController/index");
const useCommonComponents = require("../useCommonComponents/index");
const model = require("@models/reports/index");
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
    alert(err); // TODO: more graceful error reporting
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
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectQuarterlyReport = async (request, reply) => {
  try {
    const result = await model.projectQuarterlyReport();
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    reply.code(500);
    return { message: `There was a problem looking up this Project Quarterly Report.` };
  }
};

controller.getReport = async (request, reply) => {
  reply.type("application/pdf").headers({
    "Content-Disposition": 'attachment;filename="test.pdf"',
  });
  return request.data;
};

/**
 * Get a Project Status Summary Report for a specific project.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectStatusSummaryReportOnRequest = async (request, reply) => {
  try {
    const projectId = Number(request.params.id);
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      project: await model.getProjectById(projectId),
      deliverables: await model.projectStatusReport(projectId),
      milestones: await model.getMilestones(projectId),
      alignment: await model.getStrategicAlignment(projectId),
      statuses: await model.getProjectStatuses(projectId),
      lessons: await model.getLessonsLearned(projectId),
      report_date: reportDate,
    };
    const body = await getDocumentApiBody(result, "P_StatusSummary_template.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
    request.data = pdf;
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    reply.code(500);
    return { message: `There was a problem looking up this Project Status Summary Report.` };
  }
};

/**
 * Get a Project Status Summary Report for a specific project.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectQuarterlyBillingReportOnRequest = async (request, reply) => {
  try {
    const projectId = Number(request.params.id);
    const fiscal = Number(request.query.fiscal);
    const quarter = Number(request.query.quarter);
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      project: await model.getProjectById(projectId),
      deliverables: await model.getDeliverableBudgets(projectId, fiscal, quarter),
      jv: await model.getJournalVoucher(projectId, fiscal, quarter),
      client: await model.getClientCoding(projectId),
      quarter: "Q" + quarter,
      report_date: reportDate,
    };
    // Calculate grand total from each deliverable amount.
    result.deliverables_total = result.deliverables.reduce((acc, d) => acc + d.amount, 0);
    const body = await getDocumentApiBody(result, "P_QuarterlyBillingRequest_template.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
    request.data = pdf;
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    reply.code(500);
    return { message: `There was a problem looking up this Project Quarterly Billing Report.` };
  }
};

/**
 * Get a Project Dashboard Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectDashboardReportOnRequest = async (request, reply) => {
  try {
    const portfolios = request.query.portfolio;
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      dashboard: await model.getDashboardByPortfolios(portfolios),
      report_date: reportDate,
    };
    result.dashboard = groupByProperty(result.dashboard, "portfolio_id");
    // todo: Uncomment when template document is created.
    // const body = await getDocumentApiBody(result, "PA_StatusDashboard_template.docx");
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
    return { message: `There was a problem looking up this Project Dashboard Report.` };
  }
};

/**
 * Get a Project Dashboard Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getActiveProjectsReportOnRequest = async (request, reply) => {
  try {
    const portfolios = request.query.portfolio;
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      active_projects: await model.getActiveProjects(portfolios),
      report_date: reportDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
    };
    // todo: Uncomment when template document is created.
    // const body = await getDocumentApiBody(result, "PA_StatusDashboard_template.docx");
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
    return { message: `There was a problem looking up this Active Projects Report.` };
  }
};

/**
 * Get a Project Lessons Learned Report for a given fiscal year.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectLessonsLearnedReportOnRequest = async (request, reply) => {
  try {
    const fiscalYear = request.query.fiscal;
    const projectId = request.query.project;
    const portfolioIds = request.query.portfolio;
    // Get the data from the database.
    const result = {
      lessons_learned: await model.getLessonsLearnedReport(fiscalYear, projectId, portfolioIds),
      report_date: new Date(),
    };
    if (result.lessons_learned.length > 0) {
      result.lessons_learned = groupByProperty(result.lessons_learned, "lesson_category_id");
    }
    // todo: Uncomment when template document is created.
    // const body = await getDocumentApiBody(result, "PA_StatusDashboard_template.docx");
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
    return { message: `There was a problem looking up this Projects Lessons Learned Report.` };
  }
};

/**
 * Separates an array of projects into groups by a property.
 *
 * @param   {any[]}   rows     Array of projects ordered by the property to be grouped on.
 * @param   {string}  property Object property to group by.
 * @returns {any[][]}
 */
const groupByProperty = (rows, property) => {
  const groupedRows = [];
  let currentValue = rows[0][property];
  let currentGroup = [];
  for (let i = 0; i < rows.length; i++) {
    if (currentValue !== rows[i][property]) {
      groupedRows.push(currentGroup);
      currentValue = rows[i][property];
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
