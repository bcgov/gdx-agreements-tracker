const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { dateFormatShortYear } = require("@helpers/standards");

/**
 * Gets the data for a Contract Summary Report
 *
 * @param   {number} contractId Contract id to limit report to.
 * @returns {any}
 */
const getContractSummaryReport = (contractId) => {
  return knex("data.contract as contract")
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
    .where("contract.id", contractId)
    .first();
};

/**
 * Gets the contract amendments for a specific contract by id.
 *
 * @param   {number} contractId Contract id to limit report to.
 * @returns {any[]}
 */
const getContractAmendments = (contractId) => {
  const results = knex("data.contract_amendment as contract_amendment")
    .select({
      amendment_number: "amendment_number",
      amendment_date: knex.raw(
        `TO_CHAR(contract_amendment.amendment_date :: DATE, '${dateFormatShortYear}')`
      ),
      amendment_type: knex.raw(`string_agg(amendment_type.amendment_type_name, ', ')`),
      description: "contract_amendment.description",
    })
    .leftJoin("data.contract_amendment_amendment_type as cat", {
      "contract_amendment.id": "cat.contract_amendment_id",
    })
    .leftJoin("data.amendment_type as amendment_type", {
      "amendment_type.id": "cat.amendment_type_id",
    })
    .where("contract_amendment.contract_id", contractId)
    .groupBy("contract_amendment.id")
    .orderBy("contract_amendment.amendment_date");
  return results;
};

/**
 * Gets the contract payment summary for a specific contract by id and fiscal year
 *
 * @param   {number} contractId Contract id to limit report to.
 * @param   {string} fiscalYear Fiscal year to summarize over.
 * @returns {any[]}
 */
const getContractPaymentSummary = (contractId, fiscalYear) => {
  return knex("data.invoice_detail as detail")
    .select({
      fiscal: "fiscal_year",
      fees_invoiced: knex.raw("SUM(unit_amount * rate)"),
      fees_remaining: knex.raw("MIN(total_fee_amount) - SUM(unit_amount * rate)"),
    })
    .leftJoin("data.invoice as invoice", { "detail.invoice_id": "invoice.id" })
    .leftJoin("data.contract as contract", { "contract.id": "invoice.contract_id" })
    .leftJoin("data.fiscal_year as fiscal", { "fiscal.id": "invoice.fiscal" })
    .where({ "invoice.contract_id": contractId })
    .andWhere({ fiscal_year: fiscalYear })
    .groupBy("fiscal_year")
    .first();
};

/**
 * Gets the contract invoices for a specific contract by id
 *
 * @param   {number} contractId Contract id to limit report to.
 * @returns {any[]}
 */
const getContractInvoices = (contractId) => {
  const results = knex("data.invoice as invoice")
    .select({
      fiscal: knex.min("fiscal_year"),
      billing_period: knex.min("billing_period"),
      invoice_date: knex.raw(`MIN(TO_CHAR(invoice_date:: DATE, '${dateFormatShortYear}'))`),
      invoice_number: "invoice_number",
      invoice_amount: knex.raw("SUM(unit_amount * rate)"),
    })
    .leftJoin("data.contract as contract", { "contract.id": "invoice.contract_id" })
    .leftJoin("data.fiscal_year as fiscal_year", { "fiscal_year.id": "invoice.fiscal" })
    .leftJoin("data.invoice_detail as invoice_detail", {
      "invoice.id": "invoice_detail.invoice_id",
    })
    .where("invoice.contract_id", contractId)
    .groupBy("invoice_number")
    .orderBy("invoice_number");
  return results;
};

module.exports = {
  getContractSummaryReport,
  getContractAmendments,
  getContractInvoices,
  getContractPaymentSummary,
};
