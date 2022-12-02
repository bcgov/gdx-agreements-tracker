const useController = require("../useController/index");
const useCommonComponents = require("../useCommonComponents/index");
const model = require("@models/reports/index");
const projectModel = require("@models/projects");
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
    path.resolve(__dirname, `../../reports/${templateFileName}`)
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
controller.getProjectBudgetReportOnRequest = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    const projectId = Number(request.params.id);
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      project: await projectModel.findById(projectId),
      budget: await model.getProjectBudget(projectId),
      status: await projectModel.findMostRecentStatusById(projectId),
      deliverable_summaries: await model.getDeliverableSummaries(projectId),
      change_request: await model.getChangeRequests(projectId),
      contracts: await model.getContracts(projectId),
      contract_summaries: await model.getContractSummary(projectId),
      report_date: reportDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
    };

    const body = await getDocumentApiBody(result, "P_Budget_Report_Template.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
    // Injects the pdf data into the request object.
    request.data = pdf;
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    reply.code(500);
    return { message: `There was a problem looking up this Project Budget Report.` };
  }
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectQuarterlyReport = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
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

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectQuarterlyReviewReportOnRequest = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    const projectId = Number(request.params.id);
    const reportDate = new Date();
    const fiscal_breakdown = await model.getQuarterlyFiscalSummaries(projectId);
    // Get the data from the database.
    const result = {
      project: await projectModel.findById(projectId),
      deliverables: await model.getQuarterlyDeliverables(projectId, fiscal_breakdown),
      report_date: reportDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
    };
    const body = await getDocumentApiBody(result, "P_Quarterly_Review_Template.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
    // Injects the pdf data into the request object.
    request.data = pdf;
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    reply.code(500);
    return { message: `There was a problem looking up this Project Status Report.` };
  }
};

controller.getReport = async (request, reply) => {
  reply.type("application/pdf").headers({
    "Content-Disposition": 'attachment;filename="test.pdf"',
  });
  return request.data;
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectStatusReportOnRequest = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
  try {
    const projectId = Number(request.params.id);
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      project: await projectModel.findById(projectId),
      deliverables: await model.projectStatusReport(projectId),
      milestones: await model.getMilestones(projectId),
      alignment: await model.getStrategicAlignment(projectId),
      status: await projectModel.findMostRecentStatusById(projectId),
      reportDate: reportDate,
    };
    const body = await getDocumentApiBody(result, "P_Status_MostRecent_Template.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);
    // Injects the pdf data into the request object.
    request.data = pdf;
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    reply.code(500);
    return { message: `There was a problem looking up this Project Status Report.` };
  }
};

/**
 * Get a Project Status Summary Report for a specific project.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getProjectStatusSummaryReportOnRequest = async (request, reply) => {
  controller.userRequires(request, what, "reports_read_all");
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
  controller.userRequires(request, what, "reports_read_all");
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
  controller.userRequires(request, what, "reports_read_all");
  try {
    const portfolios = request.query.portfolio;
    const reportDate = new Date();
    // Get the data from the database.
    const result = {
      dashboard: await model.getDashboardByPortfolios(portfolios),
      report_date: reportDate,
    };
    result.dashboard = groupByPortfolio(result.dashboard);
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
  controller.userRequires(request, what, "reports_read_all");
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
 * Separates an array of projects into groups by their portfolio.
 *
 * @param   {any[]}   rows Array of projects ordered by portfolio.
 * @returns {any[][]}
 */
const groupByPortfolio = (rows) => {
  const groupedRows = [];
  let currentPortfolio = rows[0].portfolio_id;
  let currentGroup = [];
  for (let i = 0; i < rows.length; i++) {
    if (currentPortfolio !== rows[i].portfolio_id) {
      groupedRows.push(currentGroup);
      currentPortfolio = rows[i].portfolio_id;
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
