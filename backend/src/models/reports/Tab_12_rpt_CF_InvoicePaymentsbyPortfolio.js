const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();


// const baseQueries = {
//   t_sub: knex("contract_deliverable")
//     .select({
//       contract_id: "contract_id",
//       fiscal: "fiscal",
//       total_fee_amount: knex.raw(
//         `Sum(
//           CASE
//             WHEN is_expense = false THEN deliverable_amount
//             ELSE Cast(0 AS MONEY)
//           END
//         )`
//       ),
//       total_expense_amount: knex.raw(
//         `Sum(
//           CASE
//             WHEN is_expense = true THEN deliverable_amount
//             ELSE Cast(0 AS MONEY)
//           END
//         )`
//       ),
//     })
//     .groupBy("contract_id", "fiscal")
//     .union(
//       knex
//         .select({
//           contract_id: "contract_id",
//           fiscal: "fiscal",
//           total_fee_amount: knex.sum("total_fee_amount"),
//           total_expense_amount: knex.sum("total_expense_amount"),
//         })
//         .groupBy("contract_id", "fiscal")
//     ),

//   q1: knex("contract")
//     .select({
//       contract_id: "contract.id",
//       co_number: "contract.co_number",
//     })
//     .innerJoin("fiscal_year", "contract.fiscal", "fiscal_year.id"),
// };

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal year to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const reportQueries = {
    fiscalYear: (PARAMETER) =>
      knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", PARAMETER).first(),

    report: (PARAMETER) =>
      knex.select().fromRaw(
      `(WITH q1 AS
      (
                 SELECT     c.id contract_id,
                            c.co_number,
                            COALESCE( t.fiscal, c.fiscal )               fiscal,
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
                 FROM       contract c
                 INNER JOIN fiscal_year fy_d
                 ON         c.fiscal = fy_d.id
                 LEFT JOIN
                            (
                                     SELECT   contract_id,
                                              fiscal,
                                              Sum( total_fee_amount )   total_fee_amount,
                                              Sum(total_expense_amount) total_expense_amount
                                     FROM     (
                                                       SELECT   contract_id,
                                                                fiscal,
                                                                Sum(hours * assignment_rate) total_fee_amount,
                                                                NULL                         total_expense_amount
                                                       FROM     contract_resource
                                                       GROUP BY contract_id,
                                                                fiscal
                                                       UNION
                                                       SELECT   contract_id,
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
                                                       FROM     contract_deliverable
                                                       GROUP BY contract_id,
                                                                fiscal) t_sub
                                     GROUP BY contract_id,
                                              fiscal ) t
                 ON         c.id = t.contract_id
                 LEFT JOIN  fiscal_year fy
                 ON         t.fiscal = fy.id
                 LEFT JOIN  project p
                 ON         c.project_id = p.id
                 LEFT JOIN  lateral
                            (
                                   select portfolio_id
                                   FROM   sid_internal_coding
                                   WHERE  contract_id = c.id limit 1)sic
                 ON         true
                 LEFT JOIN  portfolio po
                 ON         po.id = sic.portfolio_id),q2 AS
      (
                SELECT    c.id contract_id,
                          c.co_number,
                          i.fiscal,
                          fy.fiscal_year,
                          i.invoice_date,
                          i.billing_period,
                          i.invoice_number,
                          sum( id.rate * id.unit_amount ) amount,
                          c.status,
                          s.supplier_name
                FROM      contract c
                LEFT JOIN invoice i
                ON        c.id = i.contract_id
                LEFT JOIN fiscal_year fy
                ON        i.fiscal = fy.id
                LEFT JOIN invoice_detail id
                ON        i.id = id.invoice_id
                LEFT JOIN supplier s
                ON        c.supplier_id = s.id
                GROUP BY  c.id,
                          c.co_number,
                          i.fiscal,
                          fy.fiscal_year,
                          i.invoice_date,
                          i.billing_period,
                          i.invoice_number,
                          c.status,
                          s.supplier_name)
      SELECT    
                q1.fiscal,
                q1.portfolio_name,
                q1.co_number,
                q1.start_date,
                q1.end_date,
                q1.project_number,
                q1.status,
                q1.total_fee_amount,
                q1.total_expense_amount,
                sum(amount)                                         AS total_of_amount,
                (total_fee_amount+total_expense_amount-sum(amount)) AS total_remaining,
                sum(
                CASE
                          WHEN q2.billing_period = ('Apr') THEN amount
                END) AS apr,
                sum(
                CASE
                          WHEN q2.billing_period = ('May') THEN amount
                END) AS may,
                sum(
                CASE
                          WHEN q2.billing_period = ('Jun') THEN amount
                END) AS jun,
                sum(
                CASE
                          WHEN q2.billing_period = ('Jul') THEN amount
                END) AS jul,
                sum(
                CASE
                          WHEN q2.billing_period = ('Aug') THEN amount
                END) AS aug,
                sum(
                CASE
                          WHEN q2.billing_period = ('Sep') THEN amount
                END) AS sep,
                sum(
                CASE
                          WHEN q2.billing_period = ('Oct') THEN amount
                END) AS oct,
                sum(
                CASE
                          WHEN q2.billing_period = ('Nov') THEN amount
                END) AS nov,
                sum(
                CASE
                          WHEN q2.billing_period = ('Dec') THEN amount
                END) AS dec,
                sum(
                CASE
                          WHEN q2.billing_period = ('Jan') THEN amount
                END) AS jan,
                sum(
                CASE
                          WHEN q2.billing_period = ('Feb') THEN amount
                END) AS feb,
                sum(
                CASE
                          WHEN q2.billing_period = ('Mar') THEN amount
                END) AS mar, (
                CASE
                          WHEN q1.status IN ('Complete',
                                             'Cancelled') THEN cast(0 AS money)
                          ELSE total_fee_amount+total_expense_amount-sum(amount)
                END) AS remaining, (
                CASE
                          WHEN q1.status                                      IN ('Complete',
                                             'Cancelled') THEN total_fee_amount+total_expense_amount-sum(amount)
                          ELSE cast(0 AS money)
                END) AS descoped
      FROM      q1
      LEFT JOIN q2
      ON        (
                          q1.fiscal = q2.fiscal)
      AND       (
                          q1.contract_id = q2.contract_id)
      GROUP BY  portfolio_name,
                q1.co_number,
                portfolio_id,
                project_number,
                portfolio_abbrev,
                q1.fiscal,
                q1.fiscal_year,
                start_date,
                end_date,
                q1.status,
                total_fee_amount,
                total_expense_amount
      ORDER BY  portfolio_name nulls first,
                q1.start_date ASC
       ) AS base`
    ).where("fiscal", PARAMETER)
};

module.exports = {
  
  required: ["fiscal"],
  getAll: async ({ fiscal: PARAMETER }) => {
    const [{fiscal_year}, report] = await Promise.all([
      reportQueries.fiscalYear(PARAMETER),
      reportQueries.report(PARAMETER),
    ]);
    console.log(JSON.stringify(report, null, 2));
    return { fiscal_year, report };
  },
};
