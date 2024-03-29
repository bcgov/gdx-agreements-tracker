const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const { whereInArray } = require("./helpers");

/**
 * Collection of queries for financial metrics.
 */
const queryFunctions = {
  getFiscalYear: (fiscalYearId) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscalYearId).first(),

  generateReportQuery: (fiscalYearId, project_type) =>
    knex
      // a list of client sponsors to select from when
      .with("clientSponsorSubquery", (qb) => {
        qb.select("cp.project_id", knex.raw("c.first_name || ' ' || c.last_name AS full_name"))
          .from("contact_project AS cp")
          .join("contact_role AS cr", "cp.contact_role", "=", "cr.id")
          .join("contact AS c", "cp.contact_id", "=", "c.id")
          .join("project", "cp.project_id", "=", "project.id")
          .where("cr.role_type", "ClientSponsor");
      })
      .with("projectManagerSubquery", (qb) => {
        qb.select(
          "project.id",
          knex.raw("contact.first_name || ' ' || contact.last_name AS full_name")
        )
          .from("contact")
          .join("project", "project.project_manager", "=", "contact.id");
      })
      .with("clientContactSubquery", (qb) => {
        qb.select("p.id as project_id")
          .select(knex.raw("COALESCE(cc.client_amount, p.total_project_budget) AS project_budget"))
          .select(knex.raw("COALESCE(c_sponsor.full_name, cc_client.full_name) AS client_sponsor"))
          .from("project as p")
          .leftJoin("client_coding as cc", "cc.project_id", "p.id")
          .joinRaw(
            `
            LEFT JOIN LATERAL (
              SELECT c.id,
                c.first_name || ' ' || c.last_name AS full_name
              FROM client_coding cc
                RIGHT JOIN portfolio po ON po.id = p.portfolio_id
                LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
                LEFT JOIN contact c ON cc.contact_id = c.id
              WHERE c.id = p.id
            ) AS cc_client ON TRUE`
          )
          .leftJoin("clientSponsorSubquery as c_sponsor", "c_sponsor.project_id", "p.id");
      })
      // main report columns come from here
      .select(
        "po.portfolio_abbrev",
        "p.project_number",
        "p.project_name",
        "p.project_type",
        "p.description",
        knex.raw("to_char(p.planned_start_date, 'DD-Mon-YY') AS start_date"),
        knex.raw("to_char(p.planned_end_date, 'DD-Mon-YY') AS end_date"),
        "cc.project_budget",
        "cc.client_sponsor",
        "pm.full_name AS project_manager"
      )
      // joined all the CTEs and sub-queries in a distinct collection to select from above
      .distinct()
      .from("project as p")
      .leftJoin("fiscal_year as fy", "p.fiscal", "fy.id")
      .leftJoin("ministry as m", "p.ministry_id", "m.id")
      .leftJoin("portfolio as po", "po.id", "p.portfolio_id")
      .leftJoin("projectManagerSubquery as pm", "pm.id", "p.id")
      .leftJoin("clientContactSubquery as cc", "cc.project_id", "p.id")
      .orderBy("p.project_number")
      .where("p.fiscal", fiscalYearId)
      .modify(whereInArray, "p.project_type", project_type),

  // sum the total project_budget and count the total results
  generateTotalsQuery: (fiscalYearId, project_type) =>
    knex(queryFunctions.generateReportQuery(fiscalYearId, project_type).as("report"))
      .sum("project_budget as total_budget")
      .count("project_number as count")
      .first(),
};

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {object}              options              - The parameters passed to this model
 * @param   {number}              options.fiscal       - The fiscal year to grab data for
 * @param   {string | undefined } options.project_type - The (optional) project type to grab data for
 * @returns {Promise}                                  - A promise that resolves to the query result
 */
const getAll = async ({ fiscal, project_type }) => {
  const sanitizedProjectType = project_type?.replace(/["]/g, "");
  try {
    const [{ fiscal_year }, report, { total_budget, count }] = await Promise.all([
      queryFunctions.getFiscalYear(fiscal),
      queryFunctions.generateReportQuery(fiscal, sanitizedProjectType),
      queryFunctions.generateTotalsQuery(fiscal, sanitizedProjectType),
    ]);

    return { fiscal_year, report, total_budget, count };
  } catch (error) {
    log.error(`Error fetching financial metrics: ${error.message}`);
    throw error;
  }
};

module.exports = { required: ["fiscal"], getAll };
