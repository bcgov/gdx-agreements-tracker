// libs
const { knex } = require("@database/databaseConnection")();
const _ = require("lodash");

// Utils
const { groupByProperty } = require("../../controllers/reports/helpers/index");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscalYear: ({ fiscal }) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: ({ fiscal, portfolio }) => {
    // turn the portfolio into an array if it isn't already an array
    const portfolios = _.castArray(portfolio);

    const subquery = knex
      .select(
        knex.raw(`COALESCE(ministry_name, ' ') as ministry_name`),
        "portfolio_abbrev",
        "project_number",
        "project_name",
        "project_type",
        "description",
        "planned_start_date",
        "planned_end_date",
        "total_project_budget",
        "client_sponsor_name",
        "project_manager",
        "portfolio_id",
        "ministry_id"
      )
      .from("v_projects_by_ministry")
      .where("fiscal_year_id", fiscal)
      .whereIn("portfolio_id", portfolios)
      .debug();

    const fullQuery = knex.with("base", subquery).select("*").from("base");

    return fullQuery;
  },
  /*
   * gets the projects per ministry
   */
  projectsAndBudgetsPerMinistry: ({ portfolio, fiscal }) => {
    const portfolios = Array.isArray(portfolio) ? portfolio : [portfolio];

    return knex
      .select(
        knex.raw(`
        COALESCE(ministry_name, ' ') as ministry_name,
        SUM(total_project_budget) as total_per_ministry,
        COUNT(*)::int as number_of_projects
      `)
      )
      .from("data.v_projects_by_ministry")
      .groupBy("ministry_id", "ministry_name", "fiscal_year", "fiscal_year_id")
      .orderBy("ministry_name", "asc")
      .where("fiscal_year_id", fiscal)
      .whereIn("portfolio_id", portfolios);
  },

  /*
   * gets the grand total of project budgets for all ministries in this fiscal year
   */
  reportTotals: ({ fiscal, portfolio }) => {
    const portfolios = _.castArray(portfolio);

    const query = knex
      .select(
        knex.raw(`
      sum(total_project_budget) as total_budget,
      count(project_number) as total_projects
      FROM data.v_projects_by_ministry
    `)
      )
      .where("fiscal_year_id", fiscal)
      .whereIn("portfolio_id", portfolios);

    return query;
  },
};

module.exports = {
  required: ["fiscal", "portfolio"],
  getAll: async ({ fiscal, portfolio }) => {
    // Use Promise.all to run multiple queries in parallel
    const [{ fiscal_year }, report, projectsAndBudgetsPerMinistry, reportTotals] =
      await Promise.all([
        queries.fiscalYear({ fiscal }),
        queries.report({ fiscal, portfolio }),
        queries.projectsAndBudgetsPerMinistry({ fiscal, portfolio }),
        queries.reportTotals({ fiscal, portfolio }),
      ]);

    // Group the report by ministry name
    const projectSummaryByMinistry = groupByProperty(report, "ministry_name");

    // Key the projects and budgets per ministry by ministry name
    const projectSummaryByMinistryKeyed = _.keyBy(projectsAndBudgetsPerMinistry, "ministry_name");

    // Extract the total number of projects and total budget from report totals
    const { total_projects, total_budget } = _.first(reportTotals);

    // Map over the project summary by ministry and add the total per ministry and number of projects
    const projectSummaryWithBudgetsAndProjects = _.map(projectSummaryByMinistry, (ministry) => ({
      ...ministry,
      total_per_ministry:
        null === ministry.ministry_id
          ? projectSummaryByMinistryKeyed[" "].total_per_ministry
          : projectSummaryByMinistryKeyed[ministry.ministry_name].total_per_ministry,
      number_of_projects: projectSummaryByMinistryKeyed[ministry.ministry_name].number_of_projects,
    }));

    // Lay out final JSON body for api call to cdogs server
    const shapedResult = {
      fiscal_year,
      ministries: projectSummaryWithBudgetsAndProjects,
      total_projects,
      total_budget,
    };

    // finally, return the result
    return shapedResult;
  },
};
