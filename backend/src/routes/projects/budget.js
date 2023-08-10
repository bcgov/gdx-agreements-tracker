const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const projectBudgetTable = `${dataBaseSchemas().data}.project_budget`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const contractsTable = `${dataBaseSchemas().data}.contract`;
const recoveriesTable = `${dataBaseSchemas().data}.recovery_type`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const clientCodingTable = `${dataBaseSchemas().data}.client_coding`;

const routes = [
  {
    method: "GET",
    url: `/projects/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAllByParentId,
  },
  {
    method: "GET",
    url: `/projects/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/fiscalbreakdown`,
    schema: validators.fiscalbreakdown,
    handler: controller.fiscalBreakdown,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/portfoliobreakdown`,
    schema: validators.portfolioBreakdown,
    handler: controller.portfolioBreakdown,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/deliverablesbreakdown`,
    schema: validators.deliverablesBreakdown,
    handler: controller.deliverablesBreakdown,
  },
  {
    method: "PUT",
    url: `/projects/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/projects/${what}`,
    schema: validators.addOne,
    handler: controller.addOne,
  },
];
const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => {
    fastify.route(route);
  });
  done();
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
  findProjectBudgetByFiscal,
  findPortfolioBreakdown,
  findDeliverablesBreakdown,
};
