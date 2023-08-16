// libs
const { knex } = require("@database/databaseConnection")();

// utils
const { getReportWithSubtotals } = require("../../controllers/reports/helpers");

// Query model - this object organizes the promises that resolve to each part of the query results for the report
const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // get the report data for the given fiscal year
  report: (fiscal) => {
    const query = knex
      .select({
        project_number: "n1.project_number",
        project_name: "n1.project_name",
        total_project_budget: "n1.total_project_budget",
        fiscal_year: "n2.fiscal_year",
        co_number: "n2.co_number",
        co_version: "n2.co_version",
        supplier_subcontractor: knex.raw(
          `(
            n2.supplier_name || CASE
              WHEN length(n2.subcontractor_name || '') > 0 THEN '/' || n2.subcontractor_name
              ELSE ''
            END
          )`
        ),
        end_date: knex.raw("to_char(n2.end_date, 'DD-Mon-YY')"),
        total_contract_amount: "n2.total_contract_amount",
        invoiced_to_date: "n2.invoiced_to_date",
        balance_remaining: knex.raw(
          `(
            CASE
            WHEN n2.status IN ('Complete', 'Cancelled') THEN cast(0 AS MONEY)
            ELSE (
              CASE
                WHEN n2.balance_remaining IS NOT NULL THEN n2.balance_remaining
                ELSE n2.total_contract_amount
              END
            )
          END
          )`
        ),
        descoped: knex.raw(
          `(
            CASE
              WHEN status IN ('Complete', 'Cancelled') THEN (
                CASE
                  WHEN balance_remaining IS NOT NULL THEN balance_remaining
                  ELSE total_contract_amount
                END
              )
              ELSE cast(0 AS MONEY)
            END
          )`
        ),
        fiscal: "fiscal",
      })
      .from(function () {
        this.distinct({
          project_id: "p.id",
          fiscal: "p.fiscal",
          project_number: "p.project_number",
          project_version: "p.project_version",
          project_name: "p.project_name",
          total_project_budget: "p.total_project_budget",
          recoverable_amount: "p.recoverable_amount",
        })
          .from("contract as c")
          .innerJoin("project AS p", "c.project_id", "p.id")
          .where("p.project_status", "like", "Complete")
          .orWhere("p.project_status", "Active")
          .as("n1");
      })

      .innerJoin(
        function () {
          this.select({
            project_id: "p.id",
            co_number: "c.co_number",
            co_version: "c.co_version",
            supplier_name: "s.supplier_name",
            subcontractor_name: "sc.subcontractor_name",
            fiscal_year: knex.raw("coalesce(fy.fiscal_year, fy_d.fiscal_year)"),
            total_contract_amount: knex.raw(
              `coalesce(t.total_fee_amount, c.total_fee_amount) + coalesce(t.total_expense_amount, c.total_expense_amount)`
            ),
            invoiced_to_date: knex.raw(`sum(id.unit_amount * id.rate)`),
            balance_remaining: knex.raw(
              `coalesce(t.total_fee_amount, c.total_fee_amount) + coalesce(t.total_expense_amount, c.total_expense_amount) - sum(id.unit_amount * id.rate)`
            ),
            end_date: "c.end_date",
            id: "p.id",
            status: "c.status",
          })
            .from("project AS p")
            .leftJoin("contract AS c", "p.id", "c.project_id")
            .leftJoin("contract_subcontractor AS cs", "cs.contract_id", "c.id")
            .leftJoin("subcontractor AS sc", "cs.subcontractor_id", "sc.id")
            .leftJoin("fiscal_year AS fy_d", "c.fiscal", "fy_d.id")
            .leftJoin("supplier AS s", "c.supplier_id", "s.id")
            .leftJoin(
              function () {
                this.select({
                  contract_id: "contract_id",
                  fiscal: "fiscal",
                  total_fee_amount: knex.sum("total_fee_amount"),
                  total_expense_amount: knex.sum("total_expense_amount"),
                })
                  .fromRaw(
                    `
                    (SELECT contract_id,
                        fiscal,
                        sum(hours* assignment_rate) as total_fee_amount,
                        NULL as total_expense_amount
                      FROM contract_resource
                      GROUP BY contract_id, fiscal
                      UNION
                      SELECT contract_id,
                        fiscal,
                        sum(
                          CASE
                            WHEN is_expense = 0::boolean THEN deliverable_amount
                            ELSE 0::money
                          END
                        ),
                        sum(
                          CASE
                            WHEN is_expense = 1::boolean THEN deliverable_amount
                            ELSE 0::money
                          END
                        )
                      FROM contract_deliverable
                      GROUP BY contract_id, fiscal) AS t_sub`
                  )
                  .groupBy("contract_id", "fiscal")
                  .as("t");
              },
              "c.id",
              "t.contract_id"
            )
            .leftJoin("fiscal_year AS fy", "t.fiscal", "fy.id")
            .leftJoin("invoice AS i", function () {
              this.on("t.contract_id", "i.contract_id").andOn("t.fiscal", "i.fiscal");
            })
            .leftJoin("invoice_detail AS id", "i.id", "id.invoice_id")
            .groupByRaw(
              `p.id,
                c.co_number,
                c.co_version,
                s.supplier_name,
                sc.subcontractor_name,
                coalesce(fy.fiscal_year, fy_d.fiscal_year),
                coalesce(t.total_fee_amount, c.total_fee_amount) + coalesce(t.total_expense_amount, c.total_expense_amount),
                c.end_date,
                p.id,
                c.status`
            )
            .as("n2");
        },
        "n1.project_id",
        "n2.project_id"
      )
      .groupByRaw(
        `n1.project_number,
        project_name,
        n1.total_project_budget,
        n2.fiscal_year,
        n2.co_number,
        n2.co_version,
        n2.supplier_name,
        n2.subcontractor_name,
        n2.end_date,
        n2.total_contract_amount,
        n2.invoiced_to_date,
        n2.status,
        n2.balance_remaining,
        fiscal`
      )
      .having("fiscal", "=", fiscal)
      .orderByRaw(
        `n1.project_number,
        n2.fiscal_year,
        n2.co_number
        `
      );
    return query;
  },

  // fold this into the report data at every project number
  subtotals: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .select({
        project_number: "project_number",
      })
      .sum({
        subtotal_total_contract_amount: "total_contract_amount",
        subtotal_invoiced_to_date: "invoiced_to_date",
        subtotal_balance_remaining: "balance_remaining",
        subtotal_descoped: "descoped",
      })
      .groupBy("project_number", "project_name"),

  // fold this in to the very end of the results
  totals: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .sum({
        total_contract_amount: "total_contract_amount",
        invoiced_to_date: "invoiced_to_date",
        balance_remaining: "balance_remaining",
        descoped: "descoped",
      })
      .first(),
};

/**********************************************************************************
 * Represents a report.
 *
 * @class
 * @param {Array} required - The required parameters for the report.
 */
class Report {
  constructor(...required) {
    const [fiscal] = required;
    this.required = fiscal;
  }

  /**
   * Gets all reports for the required parameters specified in the constructor.
   *
   * @async
   * @returns {Promise<object>} An object containing the fiscal year and report data.
   */
  async getAll() {
    const { required } = this;
    const { fiscal_year } = await queries.fiscal(required);
    const report = await queries.report(required).catch((error) => {
      console.error(error);
    });
    // Get the subtotals data from the database
    const subtotals = await queries.subtotals(required);
    const reportMayIncludeSubtotals = subtotals
      ? await getReportWithSubtotals(report, subtotals, "project_number")
      : report;
    const totals = queries?.totals ? await queries.totals(required) : null;

    return {
      fiscal_year,
      report: reportMayIncludeSubtotals,
      totals,
    };
  }
}

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => await new Report(fiscal).getAll(),
};
