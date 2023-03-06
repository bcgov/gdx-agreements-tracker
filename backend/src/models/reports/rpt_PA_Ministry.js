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

module.exports = (portfolios, fiscalYear) => {
  const query = knex.raw(`
    SELECT 

    project.project_number, 
    project.project_name, 
    portfolio.portfolio_abbrev, 
    project.description, 
    project.ministry_id, 
    ministry.ministry_name, 
    ministry.ministry_short_name, 
    project.planned_start_date, 
    project.planned_end_date, 

    CASE
      WHEN client_coding.client_amount IS NULL THEN project.total_project_budget
      ELSE data.client_coding.client_amount
    END AS total_project_budget,



    portfolio.portfolio_name,
    project.project_manager,

    IIF([client_coding].[client_amount] Is NULL,
      getProjectContacts([project].[id],"client_sponsor"),
      [contact].[first_name] || " " || [contact].[last_name]) AS client_sponsor,

    fiscal_year.fiscal_year,
    project.project_type

    FROM   (data.client_coding
      RIGHT JOIN (((data.portfolio
                    RIGHT JOIN data.project
                            ON portfolio.id = project.portfolio_id)
                   LEFT JOIN data.fiscal_year
                          ON project.fiscal = fiscal_year.id)
                  LEFT JOIN data.ministry
                         ON project.ministry_id = ministry.id)
              ON client_coding.project_id = project.id)
     LEFT JOIN data.contact
            ON client_coding.contact_id = contact.id


            


  WHERE 
  fiscal_year.fiscal_year = [Enter Fiscal Year yy-yy] 
  AND 
  project.project_type = IIF(
    [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?]="E", "External", 
    IIF( [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?]="I", "Internal",
        IIF( [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?]="M", "Social Media", 
        IIF([(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "S", "Service", 
        project.project_type
          )
        )
    )
  )

  UNION ALL 
  SELECT 
    historical_projects.project_number,
    historical_projects.project_name,
    portfolio.portfolio_abbrev,
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
    historical_projects.project_type
  FROM fiscal_year 
  INNER JOIN (
    ministry INNER JOIN (
      portfolio INNER JOIN historical_projects ON portfolio.id = historical_projects.portfolio_id
    ) 
    ON ministry.id = historical_projects.ministry_id
  ) 
    ON fiscal_year.id = historical_projects.fiscal_year
  WHERE 
    fiscal_year.fiscal_year = [Enter Fiscal Year yy-yy] 
  AND 
    historical_projects.project_type = IIF(
      [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?]="E", "External", IIF(
        [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?]="I", "Internal", IIF(
          [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?]="M", "Social Media", IIF(
            [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "S", "Service", historical_projects.project_type
            )
          )
        )
  );
  `);

  // filter by the portfolio list passed in from the frontend(if valid)
  if (undefined !== portfolios) {
    query.whereIn("portfolio_id", _.castArray(portfolios));
  }

  // filter by the fiscal year passed in from the frontend(if valid)
  if (undefined !== fiscalYear) {
    query.where({
      fiscal_year: fiscalYear,
    });
  }

  return query;
};
