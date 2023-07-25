const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;

const findAllByFiscal = (projectId) => {
  return knex
    .select(knex.raw("row_number() OVER () as id"), "fy.fiscal_year")
    .sum("pd.deliverable_amount as deliverable")
    .sum("pd.recoverable_amount as recoverable")
    .from(`${projectDeliverableTable} as pd`)
    .join(`${fiscalYearTable} as fy`, "pd.fiscal", "fy.id")
    .where("pd.project_id", projectId)
    .groupBy("fy.fiscal_year")
    .orderBy("fy.fiscal_year");
};

const findAll = (projectId) => {
  return knex
    .select(
      knex.raw("SUM(pd.deliverable_amount) as deliverable_total"),
      knex.raw("SUM(pd.recoverable_amount) as recoverable_total"),
      knex.raw("SUM(pd.deliverable_amount - pd.recoverable_amount) as non_recoverable_amount")
    )
    .where("pd.project_id", projectId)
    .from(`${projectDeliverableTable} as pd`);
};

module.exports = {
  findAllByFiscal,
  findAll,
};
