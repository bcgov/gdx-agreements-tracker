const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const contractsTable = `${dbConnection.dataBaseSchemas().data}.contract`;
const fiscalYearTable = `${dbConnection.dataBaseSchemas().data}.fiscal_year`;
const suppliersTable = `${dbConnection.dataBaseSchemas().data}.supplier`;
const portfolioTable = `${dbConnection.dataBaseSchemas().data}.portfolio`;
const projectTable = `${dbConnection.dataBaseSchemas().data}.project`;

// Get all.
const findAll = () => {
  return db
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

module.exports = {
  findAll,
};
