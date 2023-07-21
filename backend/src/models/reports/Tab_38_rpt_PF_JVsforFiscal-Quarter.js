// libs
const { knex } = require("@database/databaseConnection")();

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const reportQueries = {
  fiscalYear: (PARAMETER) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", PARAMETER).first(),

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
  getAll: async ({ fiscal, quarter }) => {
    // replace fiscal  above with whatever parameter you take here
    const [{ fiscal_year }, report, totals] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report({ fiscal, quarter }),
      reportQueries.totals({ fiscal, quarter }),
    ]);

    const reportData = { fiscal_year, report, totals };

    /**
     * console.warn doesn't produce a linter error
     * delete after your template is populating.
     */
    console.warn(JSON.stringify(reportData, null, 2));

    return reportData;
  },
};
