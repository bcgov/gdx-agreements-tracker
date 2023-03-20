const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param           requestParams portfolio: Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios. date: Optional date param. to limit report to.
 * @returns {any[]}
 */

const handleParams = (query, requestParams) => {
  if (requestParams.fiscal) {
    query.where("proj.fiscal", requestParams.fiscal);
  }
};

module.exports = {
  report_total: (requestParams) => {
    const query = knex.select(
      knex.raw(
        `SUM (proj.planned_budget) AS total_budget       
        FROM data.project proj
        LEFT JOIN data.portfolio port ON port.id = proj.portfolio_id`
      )
    );
    handleParams(query, requestParams);

    return query;
  },

  planned_budget_totals: (requestParams) => {
    const query = knex
      .select(
        knex.raw(
          `SUM (proj.planned_budget) AS total_budget,
        port.portfolio_name
        FROM data.project proj
        LEFT JOIN data.portfolio port ON port.id = proj.portfolio_id   
       `
        )
      )
      .orderBy("port.portfolio_name", "asc")
      .groupBy("portfolio_name");

    handleParams(query, requestParams);
    return query;
  },

  fiscalRegistry: (requestParams) => {
    const query = knex
      .select(
        knex.raw(
          `fy.fiscal_year,
        proj.planned_budget,
        port.portfolio_name,
        proj.fiscal,
        data.ministry.ministry_short_name AS ministry,
        proj.project_number,
        proj.project_name,
        proj.description,
        proj.initiation_date,
        proj.planned_start_date,
        proj.planned_end_date,
        c.last_name || ', ' || c.first_name project_manager,
        proj.project_type,
        port.id as port_id
        FROM data.portfolio port
        RIGHT JOIN data.project proj
        ON port.id = proj.portfolio_id
        INNER JOIN data.ministry
        ON proj.ministry_id = ministry.id
        LEFT JOIN data.contact c
        ON c.id = proj.project_manager
        LEFT JOIN data.fiscal_year fy
        ON fy.id = proj.fiscal		    
        `
        )
      )
      .orderBy("port_id", "asc")
      .orderBy("project_number", "asc");

    handleParams(query, requestParams);

    return query;
  },
};
