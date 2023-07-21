// libs
const { knex } = require("@database/databaseConnection")();

/**
 * Retrieves the data for various financial metrics based on the fiscal year and quarter
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: ({ fiscal }) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: ({ fiscal, quarter }) =>
    knex
      .select()
      .fromRaw(
        `
          (
            SELECT
              fy.id AS fiscal,
              quarter,
              p.project_number,
              p.project_name,
              jv.jv_number,
              to_char(jv.billed_date, 'DD-Mon-YY') as date,
              jv.amount
            FROM
              fiscal_year fy
              INNER JOIN (project p RIGHT JOIN jv ON p.id = jv.project_id)
              ON fy.id = jv.fiscal_year_id
            ORDER BY
              p.project_number,
              fiscal_year DESC,
              quarter ASC
          ) as base
        `
      )
      .where({
        fiscal: fiscal,
        quarter: quarter,
      }),

  totals: ({ fiscal, quarter }) =>
    knex
      .select()
      .fromRaw(
        `
          (
            SELECT
              fy.id AS fiscal,
              quarter,
              p.project_number,
              p.project_name,
              jv.jv_number,
              to_char(jv.billed_date, 'DD-Mon-YY') as date,
              jv.amount
            FROM
              fiscal_year fy
              INNER JOIN (project p RIGHT JOIN jv ON p.id = jv.project_id)
              ON fy.id = jv.fiscal_year_id
            ORDER BY
              p.project_number,
              fiscal_year DESC,
              quarter ASC
          ) as base
        `
      )
      .where({
        fiscal: fiscal,
        quarter: quarter,
      })
      .sum({ amount: "amount" }),
};

module.exports = {
  required: ["fiscal", "quarter"],

  // wait for all the promises to return in parallel, then send them to the controller
  getAll: async ({ fiscal, quarter }) => ({
    fiscal: await queries?.fiscal({ fiscal }),
    report: await queries?.report({ fiscal, quarter }),
    totals: await queries?.totals({ fiscal, quarter }),
  }),
};
