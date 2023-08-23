const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

/**
 * Retrieves annual information on Change Requests on projects for a fiscal.
 * Information based on data from 14-15 forward.
 *
 * @returns {Promise} - A promise that resolves to the query result
 */
const getReport = () =>
  knex
    .with(
      "q1",
      knex.raw(`
          SELECT fy.id AS fiscal_year_id,
            fy.fiscal_year,
            p.id AS project_id,
            p.project_number,
            p.project_name,
            coalesce(cr.initiated_by, 'None') AS initiated_by,
            coalesce(crt.crtype_name, 'None') AS cr_type,
            count(*) AS count_by_type
          FROM (
              change_request_crtype crcrt
              RIGHT JOIN (
                (
                  change_request cr
                  INNER JOIN fiscal_year fy ON cr.fiscal_year = fy.id
                )
                INNER JOIN project p ON cr.link_id = p.id
              ) ON crcrt.change_request_id = cr.id
            )
            LEFT JOIN crtype crt ON crcrt.crtype_id = crt.id
          GROUP BY fy.id,
            fy.fiscal_year,
            p.id,
            p.project_number,
            p.project_name,
            cr.initiated_by,
            crt.crtype_name`)
    )
    .with(
      "q2",
      knex.raw(`
          SELECT q1.fiscal_year_id,
            q1.fiscal_year,
            q1.project_number,
            q1.project_id,
            q1.project_name,
            q1.initiated_by,
            sum(
              CASE
                WHEN q1.cr_type = 'Budget' THEN q1.count_by_type
                ELSE NULL
              END
            ) AS budget,
            sum(
              CASE
                WHEN q1.cr_type = 'Schedule' THEN q1.count_by_type
                ELSE NULL
              END
            ) AS schedule,
            sum(
              CASE
                WHEN q1.cr_type = 'Scope' THEN q1.count_by_type
                ELSE NULL
              END
            ) AS SCOPE,
            sum(
              CASE
                WHEN q1.cr_type = 'None' THEN q1.count_by_type
                ELSE NULL
              END
            ) AS NONE
          FROM q1
          GROUP BY q1.fiscal_year_id,
            q1.fiscal_year,
            q1.project_number,
            q1.project_id,
            q1.project_name,
            q1.initiated_by`)
    )
    .with(
      "q3",
      knex.raw(`
          SELECT cr.fiscal_year AS fiscal_year_id,
            cr.link_id AS project_id,
            coalesce(cr.initiated_by, 'None') AS initiated_by,
            count(*) AS cr_count
          FROM change_request cr
          GROUP BY cr.fiscal_year,
            cr.link_id,
            coalesce(cr.initiated_by, 'None')`)
    )
    .select({
      fiscal_year: "q2.fiscal_year",
      cr_count: knex.raw("sum(q3.cr_count)"),
      initiated_by: "q2.initiated_by",
      budget: knex.raw("sum(q2.budget)"),
      schedule: knex.raw("sum(q2.schedule)"),
      scope: knex.raw("sum(q2.scope)"),
      none: knex.raw("sum(q2.none)"),
    })
    .from("q3")
    .innerJoin("q2", function () {
      this.on("q3.initiated_by", "=", "q2.initiated_by")
        .andOn("q3.project_id", "=", "q2.project_id")
        .andOn("q3.fiscal_year_id", "=", "q2.fiscal_year_id");
    })
    .groupBy("q2.fiscal_year", "q2.initiated_by");

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @returns {object} - An object containing fiscal year, report, and report total.
 */
module.exports = {
  required: [],
  getAll: async () => ({
    report: await getReport().catch((err) => log.error(err)),
  }),
};
