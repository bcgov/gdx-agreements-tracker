const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.invoice_detail`;
const contractDeliverableTable = `${dataBaseSchemas().data}.contract_deliverable`;
const fiscalTable = `${dataBaseSchemas().data}.fiscal_year`;

// Get all deliverables by invoice id.
const findAllByInvoiceId = (invoiceId) => {
  return knex
    .select(
      "*",
      { amount: knex.raw("(i.unit_amount * i.rate)::numeric::float8") },
      { type: knex.raw("(CASE WHEN is_expense THEN 'Expense' ELSE 'Fixed Price' END)") },
      "i.id"
    )
    .from(`${table} as i`)
    .join(`${contractDeliverableTable} as cd`, { "i.contract_deliverable_id": "cd.id" })
    .where("i.invoice_id", invoiceId);
};

const findById = (id) => {
  return knex
    .select(
      "i.id",
      "cd.is_expense",
      knex.raw("i.rate::numeric::float8 as rate"),
      {
        amount_remaining: knex.raw("(cd.deliverable_amount - amount_total.sum)::numeric::float8"),
      },
      knex.raw(
        "( SELECT json_build_object('value', cd.id, 'label', cd.deliverable_name)) AS contract_deliverable_id"
      ),
      { fiscal_year: "fy.fiscal_year" }
    )
    .from(`${table} as i`)
    .join(`${contractDeliverableTable} as cd`, { "i.contract_deliverable_id": "cd.id" })
    .join(`${fiscalTable} as fy`, { "cd.fiscal": "fy.id" })
    .leftJoin(
      knex(table)
        .select("contract_deliverable_id", { sum: knex.raw("SUM((unit_amount * rate))") })
        .groupBy("contract_deliverable_id")
        .as("amount_total"),
      "amount_total.contract_deliverable_id",
      "i.contract_deliverable_id"
    )
    .where("i.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newDeliverable, invoiceId) => {
  newDeliverable.invoice_id = invoiceId;
  return knex(table).insert(newDeliverable);
};

module.exports = {
  findAllByInvoiceId,
  findById,
  updateOne,
  addOne,
};
