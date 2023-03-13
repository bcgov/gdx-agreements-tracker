const _ = require("lodash");
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional project Reports - project Summary by ministry
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @param   {string}   fiscalYear Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */

const getFiscalYear = (requestParams) => {
  const query = knex.select(knex.raw(`fiscal_year from data.fiscal_year`));

  if (requestParams.fiscal) {
    query.where({ "fiscal_year.id": requestParams.fiscal });
  }

  return query;
};

const rpt_PA_Ministry = (requestParams) => {
  const query = knex
    .with(
      "client_sponsor_list",
      knex.raw(
        `SELECT contact_project.project_id,
            contact.last_name,
            contact.first_name,
            first_name || ' ' || last_name AS client_sponsor
        FROM(
                data.contact_project AS contact_project
                INNER JOIN data.contact_role AS contact_role ON contact_project.contact_role = contact_role.id
            )
            INNER JOIN data.contact as contact ON contact_project.contact_id = contact.id
            AND contact_role.role_type = 'ClientSponsor'
            `
      )
    )
    .select(
      knex.raw(`
     * FROM(
    SELECT
      CASE
        WHEN ministry.ministry_name IS NULL THEN ' '
        ELSE ministry.ministry_name
      END,
      portfolio.portfolio_abbrev,
      project.project_number,
      project.project_name,
      project.project_type,
      project.description,
      project.planned_start_date,
      project.planned_end_date,

      -- budget total for this project
      CASE
        WHEN client_coding.client_amount IS NULL
        THEN project.total_project_budget
      END AS total_project_budget,

      -- client sponsor
      CASE
          WHEN client_coding.client_amount IS NULL THEN client_sponsor
          ELSE contact.first_name || ' ' || contact.last_name
      END AS client_sponsor_name,

      c.first_name || ' ' || c.last_name as project_manager,
        portfolio.id as portfolio_id,
        project.ministry_id,
        ministry.ministry_short_name,
        portfolio.portfolio_name,
        fiscal_year.fiscal_year,
        fiscal_year.id AS fiscal_year_id
    FROM (
            data.client_coding
            RIGHT JOIN (
                (
                    (
                        data.portfolio
                        RIGHT JOIN data.project ON portfolio.id = project.portfolio_id
                    )
                    LEFT JOIN data.fiscal_year as fiscal_year ON project.fiscal = fiscal_year.id
                )
                LEFT JOIN data.ministry ON project.ministry_id = ministry.id
            ) ON client_coding.project_id = project.id
        )
        LEFT JOIN data.contact as contact ON client_coding.contact_id = contact.id
        LEFT JOIN data.contact as c on data.project.project_manager = c.id
        --GET CLIENT SPONSOR STUFF
        LEFT JOIN client_sponsor_list ON client_sponsor_list.project_id = project.id
    UNION ALL
    SELECT ministry.ministry_name,
      portfolio.portfolio_abbrev,
      historical_projects.project_number,
      historical_projects.project_name,
      historical_projects.project_type,
      historical_projects.description,
      historical_projects.start_date,
      historical_projects.end_date,
      historical_projects.total_project_budget,
      NULL AS client_sponsor,
      historical_projects.project_manager,
        portfolio.id as portfolio_id,
        historical_projects.ministry_id,
        ministry.ministry_short_name,
        portfolio.portfolio_name,
        fiscal_year.fiscal_year,
        fiscal_year.id AS fiscal_year_id
    FROM data.fiscal_year as fiscal_year
        INNER JOIN (
            data.ministry as ministry
            INNER JOIN (
                data.portfolio as portfolio
                INNER JOIN data.historical_projects as historical_projects ON historical_projects.portfolio_id = portfolio.id
            ) ON ministry.id = historical_projects.ministry_id
        ) ON fiscal_year.id = historical_projects.fiscal_year
  ) as projectByMinistry
  `)
    );

  // Order and Group by ministry name
  query.groupByRaw(
    "ministry_name, project_number, project_name, portfolio_abbrev, description, ministry_id, ministry_short_name, planned_start_date, planned_end_date, total_project_budget, portfolio_name, project_manager, client_sponsor_name,fiscal_year, project_type, portfolio_id, fiscal_year_id"
  );
  query.orderByRaw("ministry_name NULLS FIRST");

  // filter by the portfolio list passed in from the frontend(if valid)
  if (requestParams.portfolio) {
    const portfolio = requestParams.portfolio;

    if (requestParams.portfolio instanceof Array) {
      query.whereIn("portfolio_id", portfolio);
    } else {
      query.where("portfolio_id", portfolio);
    }
  }

  if (requestParams.fiscal) {
    query.where({ fiscal_year_id: requestParams.fiscal });
  }

  if (requestParams.projectType) {
    query.where({ project_type: requestParams.projectType });
  } else {
    query.where({ project_type: "External" });
  }

  return query;
};

module.exports = { rpt_PA_Ministry, getFiscalYear };
