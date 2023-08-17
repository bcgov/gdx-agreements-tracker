const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

/**
 *
 * Retrieves Summary stats report for contracts detailing the types of amendments for a specific year and number of CO’s.
 * Information based on data from 14-15 forward.
 *
 * @returns {Promise<{report: *}>}
 */
const getReport = () => {
  const query = knex
    .with(
      "q1",
      knex.raw(
        `SELECT c.fiscal AS fiscal_year_id,
          COUNT(*) AS amendment_count,
          c.contract_type
        FROM contract c
          INNER JOIN contract_amendment ca ON c.id = ca.contract_id
        WHERE c.contract_type = 'ChangeOrder'
        GROUP BY c.fiscal,
        c.contract_type`
      )
    )
    .with(
      "q2",
      knex.raw(
        `SELECT fy.fiscal_year,
          c.co_number,
          q1.amendment_count,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'Resources' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS resources,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'Scope' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS scope,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'Budget' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS budget,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'Hours' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS hours,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'Timelines' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS timelines,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'End Date' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS end_date,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'Expenses' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS expenses,
          COUNT(
            CASE
              WHEN at.amendment_type_name = 'Admin' THEN at.amendment_type_name
              ELSE NULL
            END
          ) AS admin
        FROM (
            contract_amendment_amendment_type caat
            LEFT JOIN amendment_type at ON caat.amendment_type_id = at.id
          )
          RIGHT JOIN (
            (
              q1
              INNER JOIN (
                contract c
                INNER JOIN fiscal_year fy ON c.fiscal = fy.id
              ) ON q1.fiscal_year_id = fy.id
            )
            LEFT JOIN contract_amendment ca ON c.id = ca.contract_id
          ) ON caat.contract_amendment_id = ca.id
        GROUP BY fy.fiscal_year,
          c.co_number,
          q1.amendment_count`
      )
    )
    .select({
      fiscal_year: "q2.fiscal_year",
      contract_count: knex.raw("COUNT(*)"),
      amendment_count: "q2.amendment_count",
      resources: knex.sum("q2.resources"),
      budget: knex.sum("q2.budget"),
      timelines: knex.sum("q2.timelines"),
      scope: knex.sum("q2.scope"),
      hours: knex.sum("q2.hours"),
      expenses: knex.sum("q2.expenses"),
      end_date: knex.sum("q2.end_date"),
      admin: knex.sum("q2.admin"),
    })
    .from("q2")
    .groupBy("q2.fiscal_year", "q2.amendment_count")
    .orderBy("fiscal_year", "asc")
    .catch((error) => {
      log.error(error);
    });

  return query;
};

// return the model data
module.exports = { required: [], getAll: async () => ({ report: await getReport() }) };
