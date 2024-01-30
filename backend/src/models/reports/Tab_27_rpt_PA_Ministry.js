const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

// Constant
const { dateFormatShortYear } = require("@helpers/standards");

const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal, project_type) =>
    knex.select().fromRaw(
      `
        (
        WITH ClientSponsor AS (
          SELECT cp.project_id,
            c.first_name || ' ' || c.last_name AS full_name
          FROM contact_project AS cp
            JOIN contact_role AS cr ON cp.contact_role = cr.id
            JOIN contact AS c ON cp.contact_id = c.id
            JOIN project ON cp.project_id = project.id
          WHERE cr.role_type = 'ClientSponsor'
        ),
        ProjectManager AS (
          SELECT project.id,
            contact.first_name || ' ' || contact.last_name AS full_name
          FROM contact
            JOIN project ON project.project_manager = contact.id
        ),
        ClientContactSubquery AS (
          SELECT p.id AS project_id,
            COALESCE(cc.client_amount, p.total_project_budget) AS project_budget,
            COALESCE(c_sponsor.full_name, cc_client.full_name) AS client_sponsor
          FROM project p
            LEFT JOIN client_coding cc ON cc.project_id = p.id
            LEFT JOIN LATERAL (
              SELECT c.id,
                c.first_name || ' ' || c.last_name AS full_name
              FROM client_coding cc
                RIGHT JOIN portfolio po ON po.id = p.portfolio_id
                LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
                LEFT JOIN contact c ON cc.contact_id = c.id
              WHERE c.id = p.id
            ) AS cc_client ON true
            LEFT JOIN ClientSponsor c_sponsor ON c_sponsor.project_id = p.id
        )
        SELECT DISTINCT ON (p.project_number)
          po.portfolio_abbrev,
          p.project_number,
          p.project_name,
          p.project_type,
          p.description,
          to_char(p.planned_start_date, '${dateFormatShortYear}') AS start_date,
          to_char(p.planned_end_date, '${dateFormatShortYear}') AS end_date,
          cc.project_budget,
          cc.client_sponsor,
          pm.full_name AS project_manager,
          p.fiscal AS fiscalId,
          p.project_type AS projType
        FROM project p
          LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
          LEFT JOIN ministry m ON p.ministry_id = m.id
          LEFT JOIN portfolio po ON po.id = p.portfolio_id
          LEFT JOIN ProjectManager pm ON pm.id = p.id
          LEFT JOIN ClientContactSubquery cc ON cc.project_id = p.id
        ORDER BY p.project_number
      ) AS base
      WHERE base.fiscalId = ? AND base.projType = ?`,
      [fiscal, project_type]
    ),

  total: (fiscal, project_type) =>
    knex(queries.report(fiscal, project_type).as("report"))
      .sum({
        project_budget: "project_budget",
      })
      .first(),
};

const getAll = async ({ fiscal, project_type }) => {
  const projectType = project_type.replace(/["]/g, "");

  try {
    const [{ fiscal_year }, report, total] = await Promise.all([
      queries.fiscal(fiscal),
      queries.report(fiscal, projectType),
      queries.total(fiscal, projectType),
    ]);

    return { fiscal_year, report, total };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

module.exports = { required: ["fiscal", "project_type"], getAll };
