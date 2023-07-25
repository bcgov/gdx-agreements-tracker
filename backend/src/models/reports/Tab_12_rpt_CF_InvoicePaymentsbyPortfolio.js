const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { groupByProperty } = require("../../controllers/reports/helpers");
const _ = require("lodash");

/**
 * Retrieves the base queries for invoice payments without filtering by fiscal year.
 *
 *
 * @returns {Promise} - A promise that resolves to the query result
 */
const baseQueries = {
  q1: knex.raw(
    `(
      SELECT
        c.id contract_id,
        c.co_number,
        COALESCE( t.fiscal, c.fiscal )
        fiscal,
        COALESCE( fy.fiscal_year, fy_d.fiscal_year ) fiscal_year,
        sic.portfolio_id,
        po.portfolio_name,
        po.portfolio_abbrev,
        c.start_date,
        p.project_number,
        c.end_date,
        c.status,
        COALESCE( t.total_fee_amount, c.total_fee_amount )         total_fee_amount,
        COALESCE( t.total_expense_amount, c.total_expense_amount ) total_expense_amount
      FROM contract c
      INNER JOIN fiscal_year fy_d ON c.fiscal = fy_d.id
      LEFT JOIN (
        SELECT
          contract_id,
          fiscal,
          Sum( total_fee_amount )   total_fee_amount,
          Sum(total_expense_amount) total_expense_amount
        FROM(
          SELECT
            contract_id,
            fiscal,
            Sum(hours * assignment_rate) total_fee_amount,
            NULL total_expense_amount
          FROM
            contract_resource
          GROUP BY
            contract_id,
            fiscal
          UNION
          SELECT
            contract_id,
            fiscal,
            Sum(
              CASE
                WHEN is_expense = false THEN deliverable_amount
                ELSE Cast(0 AS MONEY)
              END ),
            Sum(
              CASE
                WHEN is_expense = true THEN deliverable_amount
                ELSE Cast(0 AS MONEY)
              END )
          FROM
            contract_deliverable
          GROUP BY
            contract_id,
            fiscal) t_sub
          GROUP BY
            contract_id,
            fiscal ) t ON c.id = t.contract_id
      LEFT JOIN  fiscal_year fy ON t.fiscal = fy.id
      LEFT JOIN  project p ON c.project_id = p.id
      LEFT JOIN  lateral (
        SELECT
          portfolio_id
        FROM
          sid_internal_coding
        WHERE contract_id = c.id limit 1) sic ON true
      LEFT JOIN  portfolio po ON po.id = sic.portfolio_id) AS q1`
  ),

  q2: knex.raw(
    `(
      SELECT
        c.id contract_id,
        c.co_number,
        i.fiscal,
        fy.fiscal_year,
        i.invoice_date,
        i.billing_period,
        i.invoice_number,
        sum( id.rate * id.unit_amount ) amount,
        c.status,
        s.supplier_name
      FROM
        contract c
      LEFT JOIN invoice i ON c.id = i.contract_id
      LEFT JOIN fiscal_year fy ON i.fiscal = fy.id
      LEFT JOIN invoice_detail id ON i.id = id.invoice_id
      LEFT JOIN supplier s ON c.supplier_id = s.id
      GROUP BY
        c.id,
        c.co_number,
        i.fiscal,
        fy.fiscal_year,
        i.invoice_date,
        i.billing_period,
        i.invoice_number,
        c.status,
        s.supplier_name) AS q2`
  )
}

/**
 * Retrieves the final queries for invoice payments, filtered by fiscal year
 *
 *
 * @param   {number | string | Array} fiscal- The fiscal year to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const reportQueries = {
  fiscalYear: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // The columns on which to calculate totals.
  columns: {
    total_fee_amount: 'total_fee_amount',
    total_expense_amount: "total_expense_amount",
    total_remaining: 'total_remaining',
    apr: 'apr',
    may: 'may',
    jun: 'jun',
    jul: 'jul',
    aug: 'aug',
    sep: 'sep',
    oct: 'oct',
    nov: 'nov',
    dec: 'dec',
    jan: 'jan',
    feb: 'feb',
    mar: 'mar',
    remaining: 'remaining',
    descoped: 'descoped',
  },

  // The report query, which builds off of the base queries.
  report: (fiscal) => knex(baseQueries.q1)
    .select({
      portfolio_name: "q1.portfolio_name",
      co_number: "q1.co_number",
      start_date: knex.raw(`to_char(q1.start_date, 'DD-Mon-YY')`),
      end_date: knex.raw(`to_char(q1.end_date, 'DD-Mon-YY')`),
      project_number: "q1.project_number",
      status: "q1.status",
      total_fee_amount: "q1.total_fee_amount",
      total_expense_amount: knex.sum("amount"),
      total_remaining: knex.raw(`total_fee_amount+total_expense_amount-sum(amount)`),
      apr: knex.raw(`sum(CASE WHEN q2.billing_period = ('Apr') THEN amount END)`),
      may: knex.raw(`sum(CASE WHEN q2.billing_period = ('May') THEN amount END)`),
      jun: knex.raw(`sum(CASE WHEN q2.billing_period = ('Jun') THEN amount END)`),
      jul: knex.raw(`sum(CASE WHEN q2.billing_period = ('Jul') THEN amount END)`),
      aug: knex.raw(`sum(CASE WHEN q2.billing_period = ('Aug') THEN amount END)`),
      sep: knex.raw(`sum(CASE WHEN q2.billing_period = ('Sep') THEN amount END)`),
      oct: knex.raw(`sum(CASE WHEN q2.billing_period = ('Oct') THEN amount END)`),
      nov: knex.raw(`sum(CASE WHEN q2.billing_period = ('Nov') THEN amount END)`),
      dec: knex.raw(`sum(CASE WHEN q2.billing_period = ('Dec') THEN amount END)`),
      jan: knex.raw(`sum(CASE WHEN q2.billing_period = ('Jan') THEN amount END)`),
      feb: knex.raw(`sum(CASE WHEN q2.billing_period = ('Feb') THEN amount END)`),
      mar: knex.raw(`sum(CASE WHEN q2.billing_period = ('Mar') THEN amount END)`),
      remaining: knex.raw(
        `CASE
          WHEN q1.status IN ('Complete', 'Cancelled') THEN cast(0 AS money)
          ELSE total_fee_amount+total_expense_amount-sum(amount)
        END`),
      descoped: knex.raw(
        `CASE
          WHEN q1.status IN ('Complete', 'Cancelled') THEN total_fee_amount+total_expense_amount-sum(amount)
          ELSE cast(0 AS money)
        END`),
    })
    .leftJoin(baseQueries.q2, function () {
      this
        .on('q1.fiscal', 'q2.fiscal')
        .andOn('q1.contract_id', 'q2.contract_id')
    })
    .groupBy(
      'portfolio_name',
      'q1.co_number',
      'portfolio_id',
      'project_number',
      'portfolio_abbrev',
      'q1.fiscal',
      'q1.fiscal_year',
      'start_date',
      'end_date',
      'q1.status',
      'total_fee_amount',
      'total_expense_amount'
    )
    .orderByRaw(
      `portfolio_name nulls first,
      q1.start_date ASC`
    )
    .where("q1.fiscal", fiscal),

  // Subtotals for each portfolio.
  totals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report"))
      .select({
        portfolio_name: "portfolio_name"
      })
      .sum(reportQueries.columns)
      .groupBy("portfolio_name"),

  // Grand totals.
  grandTotals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report"))
      .sum(reportQueries.columns)
};

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    const { fiscal_year } = await reportQueries.fiscalYear(fiscal);
    const report = await reportQueries.report(fiscal);
    const totals = await reportQueries.totals(fiscal);
    const grandTotals = await reportQueries.grandTotals(fiscal);

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
