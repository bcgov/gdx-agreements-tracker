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
  const query = knex.select(
    knex.raw(`
        COALESCE(ministry_name, ' ') as ministry_name,
        portfolio_abbrev,
        project_number,
        project_name,
        project_type,
        description,
        planned_start_date,
        planned_end_date,
        total_project_budget,
        client_sponsor_name,
        project_manager,
        portfolio_id,
        ministry_id
      FROM data.view_project_ministry_client_sponsor
  `)
  );

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

// get the fiscal year based on the id passed from frontend
const getFiscalYear = (requestParams) => {
  const query = knex.select(knex.raw(`fiscal_year from data.fiscal_year`));

  if (requestParams.fiscal) {
    query.where({ "fiscal_year.id": requestParams.fiscal });
  }

  return query;
};

/*
 * gets the projects per ministry
 */
const projectsAndBudgetsPerMinistry = (requestParams) => {
  const query = knex.select(
    knex.raw(`
        COALESCE(ministry_name, ' ') as ministry_name,
        sum(total_project_budget) as total_per_ministry,
        count(*)::int as number_of_projects
      FROM data.view_project_ministry_client_sponsor
    `)
  );

  // Order and Group by ministry name
  query.groupByRaw("ministry_id, ministry_name, fiscal_year, fiscal_year_id");
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

/*
 * gets the grand total of project budgets for all ministries in this fiscal year
 */
const reportTotals = (requestParams) => {
  const query = knex.select(
    knex.raw(`
      sum(total_project_budget) as total_budget,
      count(project_number) as total_projects
      FROM data.view_project_ministry_client_sponsor
    `)
  );

  if (requestParams.fiscal) {
    query.where({ fiscal_year_id: requestParams.fiscal });
  }

  if (requestParams.projectType) {
    query.where({ project_type: requestParams.projectType });
  } else {
    query.where({ project_type: "External" });
  }

  // filter by the portfolio list passed in from the frontend(if valid)
  if (requestParams.portfolio) {
    const portfolio = requestParams.portfolio;

    if (requestParams.portfolio instanceof Array) {
      query.whereIn("portfolio_id", portfolio);
    } else {
      query.where("portfolio_id", portfolio);
    }
  }

  return query;
};

module.exports = {
  rpt_PA_Ministry,
  getFiscalYear,
  projectsAndBudgetsPerMinistry,
  reportTotals,
};
