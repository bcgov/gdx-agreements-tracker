const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { groupByProperty } = require("../../controllers/reports/helpers");
const _ = require("lodash");

/**
 * Retrieves the Capital GDX data, filtered by fiscal
 *
 * @param   {number}  fiscal - The fiscal year to grab data for
 * @returns {Promise}        - A promise that resolves to the query result
 */

const reportQueries = {
  fiscalYear: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // The columns on which to calculate totals.
  columns: {
    total_contract_payable: "total_contract_payable",
    total_invoiced: "total_invoiced",
    total_remaining: "total_remaining",
    descoped: "descoped",
  },

  // The report query, which builds off of base queries.
  report: (fiscal) =>
    knex
      .with(
        "q1",
        knex.raw(
          `SELECT 
            contract_id, 
            co_number, 
            total_fee_amount, 
            total_expense_amount, 
            fees_invoiced, 
            expenses_invoiced, 
            total_invoiced, 
            total_fee_amount - fees_invoiced fees_remaining, 
            total_expense_amount - expenses_invoiced expenses_remaining, 
            total_fee_amount + total_expense_amount - total_invoiced total_remaining,
            fiscal
          FROM 
            (
              SELECT 
                c.id contract_id, 
                c.co_number, 
                c.total_fee_amount, 
                c.total_expense_amount,
                c.fiscal,
                SUM(
                  COALESCE(
                    CASE WHEN COALESCE(cd.is_expense, FALSE) <> FALSE THEN CAST(0 AS MONEY) ELSE id.unit_amount * id.rate END, 
                    CAST(0 AS MONEY)
                  )
                ) fees_invoiced, 
                SUM(
                  COALESCE(
                    CASE WHEN COALESCE(cd.is_expense, FALSE) <> FALSE THEN id.unit_amount * id.rate END, 
                    CAST(0 AS MONEY)
                  )
                ) expenses_invoiced, 
                SUM(
                  COALESCE(
                    id.unit_amount * id.rate, 
                    CAST(0 AS MONEY)
                  )
                ) total_invoiced 
              FROM 
                contract c 
                LEFT JOIN invoice i ON c.id = i.contract_id 
                LEFT JOIN invoice_detail id ON i.id = id.invoice_id 
                LEFT JOIN contract_deliverable cd ON id.contract_deliverable_id = cd.id 
              GROUP BY 
                c.id, 
                c.co_number, 
                c.total_fee_amount, 
                c.total_expense_amount,
                c.fiscal ) a`
        )
      )
      .select({
        wip_no: "sic.wip_no",
        co_number: "c.co_number",
        co_version: "c.co_version",
        project_number: "p.project_number",
        description: "c.description",
        supplier_name: "s.supplier_name",
        resource_name: knex.raw(
          `(
            array_agg(
              Resource_First_Name || ' ' || Resource_Last_Name 
              order by 
                r.id asc
            )
          ) [1]`
        ),
        start_date: knex.raw(`TO_CHAR(c.start_date, 'DD-Mon-YY')`),
        end_date: knex.raw(`TO_CHAR(c.end_date, 'DD-Mon-YY')`),
        status: "c.status",
        total_contract_payable: knex.raw(`c.total_fee_amount + c.total_expense_amount`),
        total_invoiced: "q1.total_invoiced",
        total_remaining: knex.raw(
          "CASE WHEN status IN('complete', 'cancelled') THEN CAST(0 AS MONEY) ELSE total_remaining END"
        ),
        descoped: knex.raw(
          "CASE WHEN status IN('complete', 'cancelled') THEN total_remaining ELSE CAST(0 AS MONEY) END"
        ),
        fiscal: "q1.fiscal",
      })
      .from("resource AS r")
      .joinRaw(
        `RIGHT JOIN (
          project p 
          INNER JOIN (
            portfolio po 
            INNER JOIN (
              (
                (
                  supplier s 
                  RIGHT JOIN (
                    (
                      contract c 
                      INNER JOIN q1 ON c.id = q1.contract_id
                    ) 
                    INNER JOIN fiscal_year fy ON c.fiscal = fy.id
                  ) ON s.id = c.supplier_id
                ) 
                INNER JOIN contract_resource cr ON c.id = cr.contract_id
              ) 
              INNER JOIN sid_internal_coding sic ON c.id = sic.contract_id
            ) ON po.id = sic.portfolio_id
          ) ON p.id = c.project_id
        ) ON r.id = cr.resource_id`
      )
      .groupBy(
        "sic.wip_no",
        "c.co_number",
        "c.co_version",
        "p.project_number",
        "c.description",
        "s.supplier_name",
        "c.start_date",
        "c.end_date",
        "c.status",
        "c.total_fee_amount",
        "c.total_expense_amount",
        "q1.total_invoiced",
        "total_remaining",
        "sic.stob",
        "sic.asset_tag",
        "sic.cas_project_number",
        "q1.fiscal"
      )
      .having("sic.stob", "=", 2000)
      .andWhere("q1.fiscal", fiscal)
      .orderByRaw(`wip_no NULLS FIRST, co_number`),

  // Subtotals for each wip.
  totals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report"))
      .select({
        wip_no: "wip_no",
      })
      .sum(reportQueries.columns)
      .groupBy("wip_no"),

  // Grand totals for the report columns.
  grandTotals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report")).sum(reportQueries.columns),
};

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    const [{ fiscal_year }, report, totals, grand_totals] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report(fiscal),
      reportQueries.totals(fiscal),
      reportQueries.grandTotals(fiscal),
    ]);

    // Restructure data to allow for grouping by portfolios
    const reportByProperty = groupByProperty(report, "wip_no");
    const totalsByProperty = _.keyBy(totals, "wip_no");
    const reportsByPropertyWithTotals = _.map(reportByProperty, (wip_no) => ({
      ...wip_no,
      wip_no_totals: totalsByProperty[wip_no.wip_no],
    }));

    return { fiscal_year, reportsByPropertyWithTotals, grand_totals };
  },
};
