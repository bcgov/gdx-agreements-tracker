const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param           requestParams portfolio: Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios. date: Optional date param. to limit report to.
 * @returns {any[]}
 */

const rpt_PA_Registered = (requestParams) => {
  const query = knex
    .select(
      knex.raw(`data.project.initiation_date,
      data.portfolio.portfolio_name    AS Portfolio,
      data.project.fiscal,
      data.ministry.ministry_short_name AS Ministry,
      data.project.project_number,
      data.project.project_name,
      data.project.project_manager,
      data.project.description,
      data.project.planned_start_date,
      data.project.planned_end_date,
      data.project.planned_budget,
      c.last_name || ', ' || c.first_name project_manager,
      data.project.project_type
      FROM (data.portfolio
      RIGHT JOIN data.project
      ON data.portfolio.id = data.project.portfolio_id)
      INNER JOIN data.ministry
      ON data.project.ministry_id = ministry.id
      LEFT JOIN data.contact c
      ON c.id = data.project.project_manager
 `)
    )
    .orderBy("data.portfolio.portfolio_name", "asc")
    .orderBy("data.project.fiscal", "desc")
    .orderBy("data.project.project_number", "desc");

  // This param. is optional so we need a condition to check for the param. before we add a where clause.
  if (requestParams.portfolio) {
    //Check if the portfolio param has multiple values. If It does add a "knex.whereIn" passing the portfolios (in the format of an Array).
    if (Array.isArray(requestParams.portfolio)) {
      query.whereIn("data.project.portfolio_id", requestParams.portfolio);
    } else {
      query.where({ " data.project.portfolio_id": requestParams.portfolio });
    }
  }

  //The frontend enforces that you enter a date, this is a second layer of validation.  This is a unique knex query where knex will check if the initiation date is greater than or equal to the param date passed in.
  if (requestParams.date) {
    query.where("data.project.initiation_date", ">=", requestParams.date);
  }

  return query;
};

module.exports = {
  rpt_PA_Registered,
};
