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
    total_fee_amount: "total_fee_amount",
    total_expense_amount: "total_expense_amount",
    maximum_amount: "maximum_amount",
    invoiced_to_date: "invoiced_to_date",
    remaining: "remaining",
    descoped: "descoped",
  },

  // The report query, which builds off of the base queries.
  report: (fiscal) =>
    knex(baseQueries.q1)
      .select({
        portfolio_name: "po.portfolio_name",
        co_number: knex.raw(`c.CO_Number || ' - ' || c.CO_version`),
        project_number: "p.project_number",
        supplier_name: "s.supplier_name",
        status: "c.status",
        start_date: knex.raw(`to_char(c.start_date, 'DD-Mon-YY')`),
        end_date: knex.raw(`to_char(c.end_date, 'DD-Mon-YY')`),
        total_fee_amount: "q2.total_fee_amount",
        total_expense_amount: knex.sum("amount"),
        maximum_amount: knex.raw(`q2.Total_Fee_Amount + q2.Total_Expense_Amount`),
        invoiced_to_date: knex.raw(`CASE WHEN SUM(Amount) IS NULL THEN CAST(0 AS money) ELSE SUM(Amount) END`),
        remaining: knex.raw(
          `CASE
          WHEN c.Status IN ('Complete', 'Cancelled') THEN CAST(0 AS money)
          ELSE (
            q2.Total_Fee_Amount + q2.Total_Expense_Amount - COALESCE(SUM(q1.Amount), CAST(0 as money)))
          END`),
        descoped: knex.raw(`(q2.Total_Fee_Amount + q2.Total_Expense_Amount) - 
          (CASE
            WHEN SUM(Amount) IS Null THEN CAST(0 as money)
            ELSE SUM(Amount)
          END)`),
      })
      .rightJoin(baseQueries.q2, function () {
        this.on("q1.fiscal", "q2.fiscal").andOn("q1.contract_id", "q2.contract_id");
      })
      .innerJoin('contract as c', 'q2.contract_id', 'c.id')
      .innerJoin('supplier as s', 'c.supplier_id', 's.id')
      .innerJoin('sid_internal_coding as sic', 'c.id', 'sic.contract_id')
      .innerJoin('portfolio as po', 'sic.portfolio_id', 'po.id')
      .innerJoin('project as p', 'c.project_id', 'p.id')
      .groupByRaw(
       `c.id, 
        c.CO_Number, 
        p.Project_Number, 
        c.CO_version, 
        c.Status, 
        q2.Fiscal, 
        q2.Fiscal_Year, 
        c.Contract_Type, 
        s.supplier_name, 
        po.ID, 
        po.Portfolio_Name, 
        po.Portfolio_Abbrev, 
        c.Start_Date, 
        c.end_date,
        q2.total_fee_amount,
        q2.total_expense_amount,
        q2.total_fee_amount + q2.total_expense_amount`
      )
      .orderBy([
        { column: "portfolio_name" },
        { column: "c.end_date" },
      ])
      .where("q1.fiscal", fiscal).andWhere("po.portfolio_name", "Citizen Engagement"),

  // Subtotals for each portfolio.
  totals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report"))
      .select({
        portfolio_name: "portfolio_name",
      })
      .sum(reportQueries.columns)
      .groupBy("portfolio_name"),

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
      reportQueries.totals(fiscal),
      reportQueries.grandTotals(fiscal),
    ]);

    // Restructure data to allow for grouping by portfolios
    const reportByPortfolio = groupByProperty(report, "portfolio_name");
    const totalsByPortfolio = _.keyBy(totals, "portfolio_name");
    const reportsByPortfolioWithTotals = _.map(reportByPortfolio, (portfolio) => ({
      ...portfolio,
      portfolio_totals: totalsByPortfolio[portfolio.portfolio_name],
    }));

    return { fiscal_year, reportsByPortfolioWithTotals, grandTotals };
  },
};
