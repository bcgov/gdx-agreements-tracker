const dbConnection = require("@database/databaseConnection");
const { dataBaseSchemas } = dbConnection();

// Relevant database tables

const changeRequestTable = `${dataBaseSchemas().data}.change_request`;
const changeRequestTypeLookupTable = `${dataBaseSchemas().data}.change_request_crtype`;
const changeRequestTypeTable = `${dataBaseSchemas().data}.crtype`;
const clientCodingTable = `${dataBaseSchemas().data}.client_coding`;
const contactProjectTable = `${dataBaseSchemas().data}.contact_project`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const contractTable = `${dataBaseSchemas().data}.contract`;

const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const getFromView = `${dataBaseSchemas().data}.projects_with_json`;
const healthIndicatorTable = `${dataBaseSchemas().data}.health_indicator`;
const healthTable = `${dataBaseSchemas().data}.health_indicator`;
const jvTable = `${dataBaseSchemas().data}.jv`;
const lessonsLearnedTable = `${dataBaseSchemas().data}.project_lesson`;

const projectBudgetTable = `${dataBaseSchemas().data}.project_budget`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const projectMilestoneTable = `${dataBaseSchemas().data}.project_milestone`;
const projectPhaseTable = `${dataBaseSchemas().data}.project_phase`;
const projectStrategicAlignmentTable = `${dataBaseSchemas().data}.project_strategic_alignment`;
const projectStatusTable = `${dataBaseSchemas().data}.project_status`;
const projectTable = `${dataBaseSchemas().data}.project`;

const portfolioTable = `${dataBaseSchemas().data}.portfolio`;

const strategicAlignmentTable = `${dataBaseSchemas().data}.strategic_alignment`;
const supplierTable = `${dataBaseSchemas().data}.supplier`;

module.exports = {
  changeRequestTable,
  changeRequestTypeLookupTable,
  changeRequestTypeTable,
  clientCodingTable,
  contactProjectTable,
  contactTable,
  contractTable,
  fiscalYearTable,
  getFromView,
  healthIndicatorTable,
  healthTable,
  jvTable,
  lessonsLearnedTable,
  projectBudgetTable,
  projectDeliverableTable,
  projectMilestoneTable,
  projectPhaseTable,
  projectStrategicAlignmentTable,
  projectStatusTable,
  projectTable,
  portfolioTable,
  strategicAlignmentTable,
  supplierTable,
};
