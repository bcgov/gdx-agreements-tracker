const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { groupByProperty } = require("../../controllers/reports/helpers");
const _ = require("lodash");

/**
 * Retrieves the base queries for invoice payments without filtering by fiscal year.
 *
 * @returns {Promise} - A promise that resolves to the query result
 */
const baseQueries = {
  q1: knex.raw(
    `(
      select 
        c.id contract_id, 
        c.co_number, 
        i.fiscal, 
        fy.fiscal_year, 
        i.invoice_date, 
        i.billing_period, 
        i.invoice_number, 
        sum(id.rate * id.unit_amount) amount, 
        c.Status, 
        s.supplier_name 
      from 
        Contract c 
        left join invoice i on c.id = i.contract_id 
        left join fiscal_Year fy on i.fiscal = fy.id 
        left join invoice_Detail id on i.id = id.invoice_id 
        left join supplier s on c.supplier_id = s.id 
      group by 
        c.id, 
        c.co_number, 
        i.fiscal, 
        fy.fiscal_year, 
        i.invoice_date, 
        i.billing_period, 
        i.invoice_number, 
        c.status, 
        s.supplier_name
    ) AS q1`
  ),

  q2: knex.raw(
    `(
      select 
        c.ID Contract_ID, 
        c.CO_Number, 
        coalesce(t.Fiscal, c.Fiscal) Fiscal, 
        coalesce(
          fy.Fiscal_Year, fy_d.Fiscal_Year
        ) Fiscal_Year, 
        sic.Portfolio_ID, 
        po.Portfolio_Name, 
        po.Portfolio_Abbrev, 
        c.Start_Date, 
        p.Project_Number, 
        c.End_Date, 
        c.Status, 
        coalesce(
          t.Total_Fee_Amount, c.Total_Fee_Amount
        ) Total_Fee_Amount, 
        coalesce(
          t.Total_Expense_Amount, c.Total_Expense_Amount
        ) Total_Expense_Amount 
      from 
        Contract c 
        inner join Fiscal_Year fy_d on c.Fiscal = fy_d.ID 
        left join (
          select 
            Contract_ID, 
            Fiscal, 
            sum(Total_Fee_Amount) Total_Fee_Amount, 
            sum(Total_Expense_Amount) Total_Expense_Amount 
          from 
            (
              select 
                Contract_ID, 
                Fiscal, 
                sum(Hours * Assignment_Rate) Total_Fee_Amount, 
                null Total_Expense_Amount 
              from 
                Contract_Resource 
              group by 
                Contract_ID, 
                Fiscal 
              union 
              select 
                Contract_ID, 
                Fiscal, 
                sum(
                  case when Is_Expense = False then Deliverable_Amount else cast(0 as money) end
                ), 
                sum(
                  case when Is_Expense = True then Deliverable_Amount else cast(0 as money) end
                ) 
              from 
                Contract_Deliverable 
              group by 
                Contract_ID, 
                Fiscal
            ) t_sub 
          group by 
            Contract_ID, 
            Fiscal
        ) t on c.ID = t.Contract_ID 
        left join Fiscal_Year fy on t.Fiscal = fy.ID 
        left join Project p on c.Project_ID = p.ID 
        left join lateral (
          select 
            Portfolio_ID 
          from 
            SID_Internal_Coding 
          where 
            Contract_ID = c.ID 
          limit 
            1
        ) sic on true 
        left join Portfolio po on po.ID = sic.Portfolio_ID
    )  AS q2`
  ),
};

/**
 * Retrieves the final queries for invoice payments, filtered by fiscal year
 *
 * @param   {number | string | Array} fiscal- The fiscal year to grab data for
 * @returns {Promise}                         - A promise that resolves to the query result
 */
const reportQueries = {
  fiscalYear: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // The columns on which to calculate totals.
  columns: {
    total_project_budget: "total_project_budget",
    recoverable_amount: "recoverable_amount",
    non_recoverable: "non_recoverable",
    total_contract: "total_contract",
    bcs: "bcs",
    oss: "oss",
    des: "des",
    dp: "dp",
    ana: "ana",
    dms: "dms",
    sd: "sd",
    ce: "ce",
    current_fy_recoverable_total: "current_fy_recoverable_total",
  },

  // The report query, which builds off of the base queries.
  report: (fiscal) =>
    knex(baseQueries.q3(fiscal))
      .select({
        project_number: "project_number",
        project_name: "project_name",
        recoverable: "recoverable",
        total_project_budget: "total_project_budget",
        recoverable_amount: "recoverable_amount",
        non_recoverable: knex.raw(`total_project_budget - recoverable_amount`),
        total_contract: "total_contract",
        bcs: "bcs",
        oss: "oss",
        des: "des",
        dp: "dp",
        ana: "ana",
        dms: "dms",
        sd: "sd",
        ce: "ce",
        current_fy_recoverable_total: "current_fy_recoverable_total",
      })
      .orderBy("project_number"),

  // Grand totals.
  grandTotals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report")).sum(reportQueries.columns),
};

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    const [{ fiscal_year }, report, totals, grandTotals] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report(fiscal),
      reportQueries.grandTotals(fiscal),
    ]);

    return { fiscal_year, report, grandTotals };
  },
};
