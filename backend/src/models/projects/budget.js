const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const projectBudgetTable = `${dataBaseSchemas().data}.project_budget`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const contractsTable = `${dataBaseSchemas().data}.contract`;
const recoveriesTable = `${dataBaseSchemas().data}.recovery_type`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const clientCodingTable = `${dataBaseSchemas().data}.client_coding`;

const findAllById = (projectId) => {
  return knex(`${projectBudgetTable} as prb`)
    .columns(
      "prb.id",
      knex.raw("prb.q1_amount::numeric::float8"),
      "prb.q1_recovered",
      knex.raw("prb.q2_amount::numeric::float8"),
      "prb.q2_recovered",
      knex.raw("prb.q3_amount::numeric::float8"),
      "prb.q3_recovered",
      knex.raw("prb.q4_amount::numeric::float8"),
      "prb.q4_recovered",
      "fy.fiscal_year as fiscal",
      "prb.notes",
      "prd.deliverable_name",
      knex.raw("prb.detail_amount::numeric::float8"),
      "rec.recovery_type_name",
      "prb.stob",
      "cc.program_area",
      "cc.client",
      "cntr.co_number"
    )
    .leftJoin(`${fiscalYearTable} as fy`, { "prb.fiscal": `fy.id` })
    .leftJoin(`${projectDeliverableTable} as prd`, { "prb.project_deliverable_id": "prd.id" })
    .leftJoin(`${recoveriesTable} as rec`, { "prb.recovery_area": "rec.id" })
    .leftJoin(`${contractsTable} as cntr`, { "prb.contract_id": "cntr.id" })
    .leftJoin(`${clientCodingTable} as cc`, { "prb.client_coding_id": "cc.id" })
    .orderBy("prb.id")
    .where({ "prd.project_id": projectId });
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select(
      "prb.id",
      "prd.project_id",
      knex.raw("prb.q1_amount::numeric::float8"),
      "prb.q1_recovered",
      knex.raw("prb.q2_amount::numeric::float8"),
      "prb.q2_recovered",
      knex.raw("prb.q3_amount::numeric::float8"),
      "prb.q3_recovered",
      knex.raw("prb.q4_amount::numeric::float8"),
      "prb.q4_recovered",
      knex.raw(
        "(SELECT json_build_object('value', prb.fiscal, 'label', COALESCE(fy.fiscal_year, ''))) AS fiscal"
      ),
      "prb.notes",
      knex.raw(
        "(SELECT json_build_object('value', prb.project_deliverable_id, 'label', COALESCE(prd.deliverable_name, ''))) AS project_deliverable_id"
      ),
      knex.raw("prb.detail_amount::numeric::float8"),
      knex.raw(
        "(SELECT json_build_object('value', prb.recovery_area, 'label', COALESCE(port.portfolio_name, ''))) AS recovery_area"
      ),
      knex.raw(
        "(SELECT json_build_object('value', prb.resource_type, 'label', COALESCE(prb.resource_type, ''))) AS resource_type"
      ),
      "prb.stob",
      knex.raw(
        "(SELECT json_build_object('value', prb.client_coding_id, 'label', COALESCE(cc.program_area, cc.client))) AS client_coding_id"
      ),
      knex.raw(
        "(SELECT json_build_object('value', prb.contract_id, 'label', COALESCE(cr.co_number, ''))) AS contract_id"
      )
    )
    .from(`${projectBudgetTable} as prb`)
    .leftJoin(`${fiscalYearTable} as fy`, { "prb.fiscal": `fy.id` })
    .leftJoin(`${projectDeliverableTable} as prd`, { "prb.project_deliverable_id": "prd.id" })
    .leftJoin(`${contractsTable} as cr`, { "prb.contract_id": "cr.id" })
    .leftJoin(`${portfolioTable} as port`, { "prb.recovery_area": "port.id" })
    .leftJoin(`${clientCodingTable} as cc`, { "prb.client_coding_id": "cc.id" })
    .where("prb.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectBudgetTable).where("id", id).update(body);
};

// Add one.
const addOne = (newBudget) => {
  return knex(projectBudgetTable).insert(newBudget);
};

const findProjectBudgetByFiscal = (projectId) => {
  return knex
    .select(
      "fy.fiscal_year",
      knex.raw("row_number() OVER () as id"),
      knex.raw("SUM(q1_amount + q2_amount + q3_amount + q4_amount) AS recovered_amount"),
      knex.raw(
        "SUM(detail_amount) - SUM(q1_amount + q2_amount + q3_amount + q4_amount) AS balance_remaining"
      )
    )
    .sum("q1_amount as q1_amount")
    .sum("q2_amount as q2_amount")
    .sum("q3_amount as q3_amount")
    .sum("q4_amount as q4_amount")
    .sum("detail_amount as total_detail_amount")
    .from(`${projectBudgetTable} as pb`)
    .leftJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .join(`${fiscalYearTable} as fy`, "pd.fiscal", "fy.id")
    .where("pd.project_id", 399)
    .groupBy("fy.fiscal_year");
};

const findPortfolioBreakdown = (projectId) => {
  return knex
    .select(
      "port.portfolio_name",
      knex.raw("SUM(pb.detail_amount) as recovery_amount"),
      knex.raw("row_number() OVER () as id"),
      knex.raw(
        "SUM( CASE WHEN q1_recovered THEN q1_amount WHEN q2_recovered THEN q2_amount WHEN q3_recovered THEN q3_amount WHEN q4_recovered THEN q4_amount ELSE 0::money END ) AS recovered_to_date"
      ),
      knex.raw(
        "SUM(detail_amount) - SUM( CASE WHEN q1_recovered THEN q1_amount WHEN q2_recovered THEN q2_amount WHEN q3_recovered THEN q3_amount WHEN q4_recovered THEN q4_amount ELSE 0::money END) AS balance_remaining"
      )
    )
    .from(`${projectBudgetTable} as pb`)
    .leftJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .join(`${fiscalYearTable} as fy`, "pd.fiscal", "fy.id")
    .leftJoin(`${portfolioTable} as port`, { "pb.recovery_area": "port.id" })
    .where("pd.project_id", projectId)
    .groupBy("port.portfolio_name");
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
  findProjectBudgetByFiscal,
  findPortfolioBreakdown,
};
