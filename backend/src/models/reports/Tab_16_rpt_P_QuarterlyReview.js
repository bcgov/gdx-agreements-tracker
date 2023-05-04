const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { findById } = require("@models/projects");
const {
  projectBudgetTable,
  projectDeliverableTable,
  portfolioTable,
  clientCodingTable,
  fiscalYearTable,
} = require("@models/useDbTables");

// Get the quarterly fiscal summary for a specific project by id
const getQuarterlyFiscalSummaries = (projectId) => {
  // Client specific summaries grouped by fiscal year
  return knex(`${fiscalYearTable} as fy`)
    .select({
      fiscal_year: "fiscal_year",
      detail_total: knex.sum("detail_amount"),
      q1_total: knex.sum("q1_amount"),
      q2_total: knex.sum("q2_amount"),
      q3_total: knex.sum("q3_amount"),
      q4_total: knex.sum("q4_amount"),
      client: "pb.client_coding_id",
    })
    .leftJoin(`${projectDeliverableTable} as pd`, { "fy.id": "pd.fiscal" })
    .leftJoin(`${projectBudgetTable} as pb`, { "pd.id": "pb.project_deliverable_id" })
    .where("pd.project_id", projectId)
    .groupBy("fy.fiscal_year", "pb.client_coding_id")
    .orderBy("fy.fiscal_year", "pb.client_coding_id");
};

// Get the breakdown for deliverables for a specific project by id and fiscal_summary
const getQuarterlyDeliverables = (projectId, fiscal_summary) => {
  let data = [];
  for (let fiscal in fiscal_summary) {
    data.push(
      knex(`${projectDeliverableTable} as pd`)
        .select({
          fiscal_year: "fy.fiscal_year",
          id: "pd.id",
          deliverable_name: "deliverable_name",
          detail_amount: "detail_amount",
          q1_amount: "q1_amount",
          q2_amount: "q2_amount",
          q3_amount: "q3_amount",
          q4_amount: "q4_amount",
          resource_type: "resource_type",
          porfolio_abbrev: "portfolio_abbrev",
          responsibility: "responsibility",
          service_line: "port.service_line",
          stob: "pb.stob",
          expense_authority_name: "expense_authority_name",
        })
        .leftJoin(`${projectBudgetTable} as pb`, { "pd.id": "pb.project_deliverable_id" })
        .leftJoin(`${clientCodingTable} as cc`, { "cc.id": "pb.client_coding_id" })
        .leftJoin(`${portfolioTable} as port`, { "port.id": "pb.recovery_area" })
        .leftJoin(`${fiscalYearTable} as fy`, { "fy.id": "pd.fiscal" })
        .where({ "pd.project_id": projectId })
        .andWhere({ "fy.fiscal_year": fiscal_summary[fiscal].fiscal_year })
        // For client specific breakdown
        .andWhere({ "cc.id": fiscal_summary[fiscal].client })
        .orderBy("deliverable_name")
        // Construct the array of fiscal breakdown and summaries
        .then((results) => {
          return {
            fiscal_year: fiscal_summary[fiscal].fiscal_year,
            q1_client_total: fiscal_summary[fiscal].q1_total,
            q2_client_total: fiscal_summary[fiscal].q2_total,
            q3_client_total: fiscal_summary[fiscal].q3_total,
            q4_client_total: fiscal_summary[fiscal].q4_total,
            detail_client_total: fiscal_summary[fiscal].detail_total,
            details: results,
          };
        })
    );
  }
  return Promise.all(data);
};
module.exports = {
  findById,
  getQuarterlyFiscalSummaries,
  getQuarterlyDeliverables,
};
