// Libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

// Constants
const { dateFormatShortYear } = require("@helpers/standards");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param {number} contract - The contract number to retrieve data for.
 * @returns {Promise} - A promise that resolves to the query result
 */
const queries = {
  contractSummary: (contract) =>
    knex("contract")
      .select({
        contract: "contract.*",
        start_date: knex.raw(`TO_CHAR(contract.start_date :: DATE, '${dateFormatShortYear}')`),
        end_date: knex.raw(`TO_CHAR(contract.end_date :: DATE, '${dateFormatShortYear}')`),
        total_contract: knex.raw("contract.total_fee_amount + contract.total_expense_amount"),
        supplier_name: "supplier_name",
        internal_coding: "internal_coding.*",
        portfolio: "portfolio.*",
        portfolio_name: "portfolio.portfolio_name",
      })
      .leftJoin("data.supplier as supplier", { "supplier.id": "contract.supplier_id" })
      .leftJoin("data.sid_internal_coding as internal_coding", {
        "contract.id": "internal_coding.contract_id",
      })
      .leftJoin("data.portfolio as portfolio", { "portfolio.id": "internal_coding.portfolio_id" })
      .where("contract.id", contract)
      .first(),

  contractAmendments: (contract) =>
    knex("contract_amendment")
      .select({
        amendment_number: "amendment_number",
        amendment_date: knex.raw(
          `TO_CHAR(contract_amendment.amendment_date, '${dateFormatShortYear}')`,
        ),
        amendment_type: knex.raw(`string_agg(amendment_type.amendment_type_name, ', ')`),
        description: "contract_amendment.description",
      })
      .leftJoin("contract_amendment_amendment_type as cat", {
        "contract_amendment.id": "cat.contract_amendment_id",
      })
      .leftJoin("amendment_type", { "amendment_type.id": "cat.amendment_type_id" })
      .where("contract_amendment.contract_id", contract)
      .groupBy("contract_amendment.id")
      .orderBy("contract_amendment.amendment_date"),

  contractPayments: (contract) =>
    knex("invoice_detail as detail")
      .select({
        fees_invoiced: knex.sum("(unit_amount * rate)"),
        fees_remaining: knex.raw("MIN(total_fee_amount - SUM(unit_amount * rate)"),
      })
      .leftJoin("data.invoice as invoice", { "detail.invoice_id": "invoice.id" })
      .leftJoin("data.contract as contract", { "contract.id": "invoice.contract_id" })
      .leftJoin("data.fiscal_year as fiscal", { "fiscal.id": "invoice.fiscal" })
      .where({ "invoice.contract_id": contract })
      .groupBy("fiscal")
      .first(),

  contractInvoices: (contract) =>
    knex("invoice")
      .select({
        fiscal: knex.min("fiscal_year"),
        billing_period: knex.min("billing_period"),
        invoice_date: knex.raw(`MIN(TO_CHAR(invoice_date, '${dateFormatShortYear}'))`),
        invoice_number: "invoice_number",
        invoice_amount: knex.raw("SUM(unit_amount * rate)"),
      })
      .leftJoin("data.contract as contract", { "contract.id": "invoice.contract_id" })
      .leftJoin("data.fiscal_year as fiscal_year", { "fiscal_year.id": "invoice.fiscal" })
      .leftJoin("data.invoice_detail as invoice_detail", {
        "invoice.id": "invoice_detail.invoice_id",
      })
      .where("invoice.contract_id", contract)
      .groupBy("invoice_number")
      .orderBy("invoice_number"),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param {number} contract - The contract number to retrieve data for.
 * @returns {object} - An object containing fiscal year, report, and report total.
 */
// add other parameters if needed, like quarter, portfolio, date etc.
const getAll = async ({ contract }) => {
  try {
    // Await all promises in parallel
    const [contract_summary, contract_amendments, invoice_processing, payment_summary] =
      await Promise.all([
        queries.contractSummary(contract),
        queries.contractAmendments(contract),
        queries.paymentSummary(contract),
        queries.contractInvoices(contract),
      ]);

    // Shape this data into a form that matches the report template.
    return { contract_summary, contract_amendments, invoice_processing, payment_summary };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["fiscal"], getAll };
