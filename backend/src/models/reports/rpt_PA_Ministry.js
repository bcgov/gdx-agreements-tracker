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
    SELECT project.project_number,
        project.project_name,
        portfolio.portfolio_abbrev,
        portfolio.id as portfolio_id,
        project.description,
        project.ministry_id,
        ministry.ministry_name,
        ministry.ministry_short_name,
        project.planned_start_date,
        project.planned_end_date,
        CASE
            WHEN client_coding.client_amount IS NULL THEN (project.total_project_budget)
            ELSE data.client_coding.client_amount
        END AS total_project_budget,
        portfolio.portfolio_name,
        --project.project_manager,
        c.first_name || ' ' || c.last_name as project_manager,
        CASE
            WHEN client_coding.client_amount IS NULL THEN client_sponsor
            ELSE contact.first_name || ' ' || contact.last_name
        END AS client_sponsor_name,
        fiscal_year.fiscal_year,
        fiscal_year.id AS fiscal_year_id,
        project.project_type
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
        LEFT JOIN data.contact as c on data.project.project_manager = c.id --GET CLIENT SPONSOR STUFF
        LEFT JOIN client_sponsor_list ON client_sponsor_list.project_id = project.id
    UNION ALL
    SELECT historical_projects.project_number,
        historical_projects.project_name,
        portfolio.portfolio_abbrev,
        portfolio.id as portfolio_id,
        historical_projects.description,
        historical_projects.ministry_id,
        ministry.ministry_name,
        ministry.ministry_short_name,
        historical_projects.start_date,
        historical_projects.end_date,
        historical_projects.total_project_budget,
        portfolio.portfolio_name,
        historical_projects.project_manager,
        NULL AS client_sponsor,
        fiscal_year.fiscal_year,
        fiscal_year.id AS fiscal_year_id,
        historical_projects.project_type
    FROM data.fiscal_year as fiscal_year
        INNER JOIN (
            data.ministry as ministry
            INNER JOIN (
                data.portfolio as portfolio
                INNER JOIN data.historical_projects as historical_projects ON historical_projects.portfolio_id = portfolio.id
            ) ON ministry.id = historical_projects.ministry_id
        ) ON fiscal_year.id = historical_projects.fiscal_year
  ) as projectByMinistry`)
    )
    .debug();

  console.table(requestParams);

  /*
  // filter by the portfolio list passed in from the frontend(if valid)
  if (requestParams.portfolio) {
    const portfolio = requestParams.portfolio;

    if (requestParams.portfolio instanceof Array) {
      query.whereIn("portfolio_id", portfolio);
    } else {
      console.log(`


    IN IF BLOCK (SINGULAR)

    REQUESTPARAMS.PORTFOLIO = ${requestParams.portfolio}
    `);

      query.where("portfolio_id", portfolio);
    }
  }
*/
  // filter by the fiscal year passed in from the frontend(if valid)
  if (requestParams.fiscal) {
    query.where({ fiscal_year_id: requestParams.fiscal });
  }
  /*
  // filter by the fiscal year passed in from the frontend(if valid)
  if (requestParams.projectType) {
    query.where({
      project_type: requestParams.projectType,
    });
  }
  */

  return query;
};

module.exports = { rpt_PA_Ministry };
