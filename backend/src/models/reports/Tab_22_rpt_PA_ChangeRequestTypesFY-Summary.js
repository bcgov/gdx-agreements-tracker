const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number}  Parameter- The fiscal year to grab data for
 * @returns {Promise}            - A promise that resolves to the query result
 */
const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal) =>
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
            coalesce(cr.initiated_by, 'None')
          `)
      )
      .select({
        project_number: "q2.project_number",
        project_name: "q2.project_name",
        fiscal_year: "q2.fiscal_year",
        cr_count: "q3.cr_count",
        initiated_by: "q2.initiated_by",
        budget: "q2.budget",
        schedule: "q2.schedule",
        scope: "q2.scope",
        none: "q2.none",
      })
      .from("q3")
      .innerJoin("q2", function () {
        this.on("q3.initiated_by", "=", "q2.initiated_by")
          .andOn("q3.project_id", "=", "q2.project_id")
          .andOn("q3.fiscal_year_id", "=", "q2.fiscal_year_id");
      })
      .whereRaw(
        `
        EXISTS (
          SELECT *
          FROM project_deliverable pd
            INNER JOIN project_budget pb
            INNER JOIN fiscal_year fy ON pb.fiscal = fy.id ON pd.id = pb.project_deliverable_id
          WHERE fy.id = ?
            AND pd.project_id = q2.project_id
        ) <> FALSE`,
        [fiscal]
      )
      .orderBy("q2.project_number", "asc")
      .orderBy("fiscal_year", "asc"),
};
/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options        - Options object containing fiscal year.
 * @param   {string} options.fiscal - The fiscal year to retrieve data for.
 * @returns {object}                - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ fiscal }) => {
  try {
    // Await all promises in parallel
    const [{ fiscal_year }, report] = await Promise.all([
      queries.fiscal(fiscal),
      queries.report(fiscal),
    ]);

    return { fiscal_year, report };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
module.exports = { required: ["fiscal"], getAll };
