const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

// Constant
const { dateFormatShortYear } = require("@helpers/standards");

const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal, project_type) =>
    knex
      .select({
        project_number: "p.project_number",
        project_name: "p.project_name",
        portfolio_abbrev: "portfolio.portfolio_abbrev",
        description: "p.description",
        ministry_id: "p.ministry_id",
        ministry_name: "ministry.ministry_name",
        ministry_short_name: "ministry.ministry_short_name",
        planned_start_date: knex.raw(
          `to_char(project.planned_start_date, '${dateFormatShortYear}')`
        ),
        planned_end_date: knex.raw(`to_char(project.planned_end_date, '${dateFormatShortYear}')`),
        total_project_budget: knex.raw(
          `coalesce(
            cc.client_amount,
            p.total_project_budget
          ) AS total_project_budget`
        ),
        portfolio_name: "portfolio.portfolio_name",
        client_sponsor: knex.raw(`
            SELECT CASE
                WHEN cc.client_amount IS NULL THEN (
                  SELECT c.first_name || ' ' || c.last_name AS full_name
                  FROM contact_project cp
                    JOIN contact_role cr ON cp.contact_role = cr.id
                    JOIN contact c ON cp.contact_id = c.id
                    JOIN project ON cp.project_id = project.id
                  WHERE cr.role_type = 'ClientSponsor'
                    AND project.id = p.id
                )
                ELSE (
                  SELECT c.first_name || ' ' || c.last_name
                  FROM client_coding cc
                    RIGHT JOIN portfolio po ON po.id = p.portfolio_id
                    LEFT JOIN fiscal_year fy ON p.fiscal = fy.id
                    LEFT JOIN contact c ON cc.contact_id = c.id
                  WHERE fy.id = 9
                    AND c.id = p.id
                )
                END
        `),
        project_manager: knex.raw(`(
          SELECT first_name || ' ' || last_name
          FROM contact
          JOIN project ON project.project_manager = contact.id
          WHERE project.id = p.id
        )`),
        fy: "fy.fiscal_year",
        project_type: "p.project_type",
      })
      .from("project")
      .as("p")
      .leftJoin("portfolio", "p.portfolio_id", "portfolio.id")
      .leftJoin("ministry", "p.ministry_id", "ministry.id")
      .leftJoin("fiscal_year", "p.fiscal", "fiscal_year.id")
      .joinRaw("LEFT JOIN client_coding ON portfolio.client::INTEGER = client_coding.id")
      .where({
        "p.fiscal": fiscal,
        "p.project_type": JSON.parse(project_type),
      })
      .unionAll(function () {
        this.select({
          fiscal: "hp.fiscal_year",
          project_number: "hp.project_number",
          project_name: "hp.project_name",
          portfolio_abbrev: "portfolio.portfolio_abbrev",
          description: "hp.description",
          ministry_id: "hp.ministry_id",
          ministry_name: "ministry.ministry_name",
          ministry_short_name: "ministry.ministry_short_name",
          start_date: knex.raw(
            `to_char(historical_projects.planned_start_date, '${dateFormatShortYear}')`
          ),
          end_date: knex.raw(
            `to_char(historical_projects.planned_end_date, '${dateFormatShortYear}')`
          ),
          total_project_budget: "hp.total_project_budget",
          portfolio_name: "portfolio.portfolio_name",
          client_sponsor: knex.raw("NULL"),
          project_manager: "hp.project_manager",
          fiscal_year: "fiscal_year.fiscal_year",
          project_type: "hp.project_type",
        })
          .from("historical_projects")
          .as("hp")
          .innerJoin("portfolio", "hp.portfolio_id", "portfolio.id")
          .innerJoin("fiscal_year", "hp.fiscal_year", "fiscal_year.id")
          .innerJoin("ministry", "hp.ministry_id", "ministry.id")
          .where({
            "hp.fiscal_year": fiscal,
            "hp.project_type": JSON.parse(project_type),
          });
      }),
};

const getAll = async ({ fiscal, project_type }) => {
  try {
    const [{ fiscal_year }, report] = await Promise.all([
      queries.fiscal(fiscal),
      queries.report(fiscal, project_type),
    ]);

    return { fiscal_year, report };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

module.exports = { required: ["fiscal", "project_type"], getAll };
