const dbConnection = require("../database/databaseConnection");
const useModel = require("./useModel");
const { knex, dataBaseSchemas } = dbConnection();
const { diffInsert } = useModel();

const contractsTable = `${dataBaseSchemas().data}.contract`;
const amendmentsTable = `${dataBaseSchemas().data}.contract_amendment`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const suppliersTable = `${dataBaseSchemas().data}.supplier`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const projectTable = `${dataBaseSchemas().data}.project`;
const procurementMethodTable = `${dataBaseSchemas().data}.procurement_method`;
const contractSubcontractorTable = `${dataBaseSchemas().data}.contract_subcontractor`;

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
      knex
        .first("amendment_number")
        .from(amendmentsTable)
        .where("contract_id", contractId)
        .orderBy("amendment_date", "desc")
        .as("amendment_number"),
      knex.raw("total_fee_amount::numeric::float8"),
      knex.raw("total_expense_amount::numeric::float8"),
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
        "( SELECT json_build_object('value', c.procurement_method_id, 'label', pm.procurement_method)) AS procurement_method_id"
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

const addOrUpdate = (body, id) => {
  // Begin transaction so multiple database operations can occur at the same time.
  return knex
    .transaction(async (trx) => {
      const operations = [];
      let hasSubcontractorChanges = false;
      let rawSubcontractors = [];
      if (body.subcontractor_id) {
        hasSubcontractorChanges = true;
        rawSubcontractors = body.subcontractor_id;
        delete body.subcontractor_id;
      }
      // Update any other contract fields normally.
      if (Object.keys(body).length > 0) {
        if (null === id) {
          id = await knex(contractsTable)
            .insert(body)
            .returning("id")
            .then((newId) => {
              return newId[0].id;
            });
        } else {
          operations.push(trx(contractsTable).where("id", id).update(body));
        }
      }
      // Subcontractors must be handled differently as it updates contract_subcontractors, not the contract table.
      if (hasSubcontractorChanges) {
        // Create subcontractors array that fits diffInsert's expected structure.
        const subcontractors = rawSubcontractors.map((sub) => {
          return {
            contract_id: id,
            subcontractor_id: sub.value,
          };
        });
        // Push delete and insert operations generated from diffInsert.
        operations.push(
          ...(await diffInsert(
            contractSubcontractorTable,
            subcontractors,
            id,
            "contract_id",
            "subcontractor_id",
            trx
          ))
        );
        delete body.subcontractor_id;
      }
      // Perform all operations (subcontractors deletes, inserts, and contract updates).
      return await Promise.all(operations);
    })
    .then((result) => {
      return result;
    });
};

// Update one.
const updateOne = (body, id) => {
  return addOrUpdate(body, id);
};

// Add one.
const addOne = (newContract) => {
  return addOrUpdate(newContract, null);
};

module.exports = {
  findAll,
  findById,
  findByProjectId,
  updateOne,
  addOne,
};
