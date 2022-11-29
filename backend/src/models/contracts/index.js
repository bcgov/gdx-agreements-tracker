const dbConnection = require("@database/databaseConnection");
const useModel = require("../useModel");
const { knex, dataBaseSchemas } = dbConnection();
const { dateFormat } = require("../../helpers/standards");
const { diffInsert } = useModel();

const contractsTable = `${dataBaseSchemas().data}.contract`;
const amendmentsTable = `${dataBaseSchemas().data}.contract_amendment`;
const fiscalTable = `${dataBaseSchemas().data}.fiscal_year`;
const suppliersTable = `${dataBaseSchemas().data}.supplier`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const projectTable = `${dataBaseSchemas().data}.project`;
const procurementMethodTable = `${dataBaseSchemas().data}.procurement_method`;
const contractSubcontractorTable = `${dataBaseSchemas().data}.contract_subcontractor`;
const contractResourceTable = `${dataBaseSchemas().data}.contract_resource`;
const contractDeliverableTable = `${dataBaseSchemas().data}.contract_deliverable`;
const invoiceDetail = `${dataBaseSchemas().data}.invoice_detail`;

// Get all.
const findAll = () => {
  return knex(`${contractsTable} as c`)
    .columns(
      "p.project_number",
      "p.project_name",
      "c.contract_number",
      "c.co_version",
      "c.description",
      { supplier: "supplier.supplier_name" },
      { start_date: knex.raw(`TO_CHAR(c.start_date :: DATE, '${dateFormat}')`) },
      { end_date: knex.raw(`TO_CHAR(c.end_date :: DATE, '${dateFormat}')`) },
      "c.total_expense_amount",
      //"Remaining Amount" Leaving this here because it is on the wireframe but can't find it in the DB
      "c.status",
      { fiscal: "fy.fiscal_year" },
      { portfolio: "portfolio.portfolio_name" },
      "c.id"
    )
    .leftJoin(`${fiscalTable} as fy`, { "c.fiscal": `fy.id` })
    .leftJoin(suppliersTable, { "c.supplier_id": `${suppliersTable}.id` })
    .leftJoin(portfolioTable, { "c.supplier_id": `${portfolioTable}.id` })
    .leftJoin(`${projectTable} as p`, { "c.project_id": `p.id` })
    .orderBy("c.id", "desc");
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
    .leftJoin(`${fiscalTable} as fy`, { "c.fiscal": "fy.id" })
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

// Get specific one by id.
const findBudgetsByFiscal = async (id) => {
  const currentYear = async () => {
    return knex(fiscalTable)
      .select("id")
      .where("is_current", true)
      .first()
      .then((result) => {
        return result.id;
      });
  };

  const year = await currentYear();

  return knex
    .select(
      "fy.fiscal_year as fiscal_year",
      "deliverables.total_fees",
      knex.raw("COALESCE(deliverables.total_fees, 0) as total_fees"),
      knex.raw("ROUND(COALESCE(expenses.total_expenses, 0)) as total_expenses"),
      knex.raw("COALESCE(resources.total_hours, 0) as total_hours"),
      knex.raw("ROUND(COALESCE(invoiced_resources.invoiced_hours, 0)) as invoiced_hours"),
      knex.raw("COALESCE(invoiced_fees.invoiced_fees, 0) as invoiced_fees"),
      knex.raw("COALESCE(invoiced_expenses.invoiced_expenses, 0) as invoiced_expenses"),
      knex.raw(
        "ROUND(COALESCE(resources.total_hours, 0) - COALESCE(invoiced_resources.invoiced_hours, 0)) as remaining_hours"
      ),
      knex.raw(
        "ROUND((COALESCE(deliverables.total_fees, 0) - COALESCE(invoiced_fees.invoiced_fees, 0))) as remaining_fees"
      ),
      knex.raw(
        "ROUND((COALESCE(expenses.total_expenses, 0) - COALESCE(invoiced_expenses.invoiced_expenses, 0))) as remaining_expenses"
      )
    )
    .from(`${fiscalTable} as fy`)
    .leftJoin(
      knex(contractResourceTable)
        .select("fiscal")
        .sum("hours as total_hours")
        .where("contract_id", id)
        .groupBy("fiscal")
        .as("resources"),
      "resources.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(contractDeliverableTable)
        .select("fiscal", knex.raw("SUM(deliverable_amount::NUMERIC::float8) as total_expenses"))
        .where("contract_id", id)
        .where("is_expense", false)
        .groupBy("fiscal")
        .as("expenses"),
      "expenses.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(contractDeliverableTable)
        .select("fiscal", knex.raw("SUM(deliverable_amount::NUMERIC::float8) as total_fees"))
        .where("contract_id", id)
        .where("is_expense", true)
        .groupBy("fiscal")
        .as("deliverables"),
      "deliverables.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(`${contractResourceTable} as cr`)
        .join(`${invoiceDetail} as i`, { "cr.id": "i.contract_resource_id" })
        .select("cr.fiscal")
        .sum("i.unit_amount as invoiced_hours")
        .where("cr.contract_id", id)
        .groupBy("cr.fiscal")
        .as("invoiced_resources"),
      "invoiced_resources.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(`${contractDeliverableTable} as cd`)
        .join(`${invoiceDetail} as i`, { "cd.id": "i.contract_deliverable_id" })
        .select("cd.fiscal", knex.raw("SUM(i.rate::NUMERIC::float8) as invoiced_expenses"))
        .where("cd.contract_id", id)
        .where("cd.is_expense", true)
        .groupBy("cd.fiscal")
        .as("invoiced_expenses"),
      "invoiced_expenses.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(`${contractDeliverableTable} as cd`)
        .join(`${invoiceDetail} as i`, { "cd.id": "i.contract_deliverable_id" })
        .select("cd.fiscal", knex.raw("SUM(i.rate::NUMERIC::float8) as invoiced_fees"))
        .where("cd.contract_id", id)
        .where("cd.is_expense", false)
        .groupBy("cd.fiscal")
        .as("invoiced_fees"),
      "invoiced_fees.fiscal",
      "fy.id"
    )
    .whereBetween("fy.id", [year - 1, year + 1]);
};

module.exports = {
  findAll,
  findById,
  findByProjectId,
  updateOne,
  addOne,
  findBudgetsByFiscal,
};
