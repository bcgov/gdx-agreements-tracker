const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const contractsTable = `${dataBaseSchemas().data}.contract`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const suppliersTable = `${dataBaseSchemas().data}.supplier`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const projectTable = `${dataBaseSchemas().data}.project`;
const procurementMethodTable = `${dataBaseSchemas().data}.procurement_method`;

// Get all.
const findAll = () => {
  return knex
    .select(
      "contract.contract_number",
      "contract.co_version",
      "contract.description",
      "supplier.supplier_name",
      "contract.start_date",
      "contract.end_date",
      "contract.total_expense_amount",
      //"Remaining Amount" Leaving this here because it is on the wireframe but can't find it in the DB
      "contract.status",
      "fiscal_year.fiscal_year",
      "project.project_number",
      "portfolio.portfolio_name",
      "contract.id"
    )
    .from(contractsTable)
    .leftJoin(fiscalYearTable, { "contract.fiscal": `${fiscalYearTable}.id` })
    .leftJoin(suppliersTable, { "contract.supplier_id": `${suppliersTable}.id` })
    .leftJoin(portfolioTable, { "contract.supplier_id": `${portfolioTable}.id` })
    .leftJoin(projectTable, { "contract.project_id": `${projectTable}.id` });
};

// Get One
const findById = (contractId) => {
  return knex
    .select(
      "c.*",
      knex.raw("( SELECT json_build_object('value', c.status, 'label', c.status)) AS status"),
      knex.raw("( SELECT json_build_object('value', c.fiscal, 'label', fy.fiscal_year)) AS fiscal"),
      knex.raw(
        "( SELECT json_build_object('value', c.project_id, 'label', proj.project_number)) AS project_id"
      ),
      knex.raw(
        "( SELECT json_build_object('value', c.contract_type, 'label', c.contract_type)) AS contract_type"
      ),
      knex.raw(
        "( SELECT json_build_object('value', c.supplier_id, 'label', s.supplier_name)) AS supplier_id"
      ),
      knex.raw(
        "( SELECT json_build_object('value', c.procurement_method_id, 'label', pm.procurement_method)) AS procurement_method"
      ),
      "proj.project_name",
      "proj.total_project_budget",
      "port.*"
    )
    .from(`${contractsTable} as c`)
    .leftJoin(`${fiscalYearTable} as fy`, { "c.fiscal": "fy.id" })
    .leftJoin(`${suppliersTable} as s`, { "c.supplier_id": "s.id" })
    .leftJoin(`${portfolioTable} as port`, { "c.supplier_id": "port.id" })
    .leftJoin(`${projectTable} as proj`, { "c.project_id": "proj.id" })
    .leftJoin(`${procurementMethodTable} as pm`, { "c.procurement_method_id": "pm.id" })
    .where("c.id", contractId)
    .first();
};

// Get all contracts by project id.
const findByProjectId = (projectId) => {
  return knex(contractsTable).select("id", "co_number").where("project_id", projectId);
};

module.exports = {
  findAll,
  findById,
  findByProjectId,
};
