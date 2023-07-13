const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves historical recoveries.
 *
 * 
 * @param   {string}            portfolio - Portfolio value to filter the report.
 * @returns {Knex.QueryBuilder}        Knex query builder for fetching report totals.
 */
const projectRecoveryHistorical = knex( "historical_projects" )
  .select({
    project_number: "historical_projects.project_number",
    project_name: "historical_projects.project_name",
    total_project_budget: "historical_projects.total_project_budget",
    budget_fiscal: "fiscal_year.fiscal_year",
    q1: "historical_project_billing.q1",
    q2: "historical_project_billing.q2",
    q3: "historical_project_billing.q3",
    q4: "historical_project_billing.q4",
    total_recovered: knex.raw("cast( COALESCE(Q1, '0') + COALESCE(Q2, '0') + COALESCE(Q3, '0') + COALESCE(Q4, '0') as money)"),
  })
  .innerJoin( "fiscal_year", "historical_projects.fiscal_year", "fiscal_year.id" )
  .innerJoin( "historical_project_billing", "historical_projects.project_number", "historical_project_billing.project_number")
  .groupBy(
    "historical_projects.project_number",
    "historical_projects.project_name",
    "historical_projects.total_project_budget",
    "fiscal_year.fiscal_year",
    "historical_project_billing.q1",
    "historical_project_billing.q2",
    "historical_project_billing.q3",
    "historical_project_billing.q4",
  )

const projectRecovery = knex("fiscal_year")
  .select({
    project_id: "project.id",
    project_number:"project.project_number",
    project_name: "project.project_name",
    total_project_budget: "project.total_project_budget",
    fiscal_year: "fiscal_year.fiscal_year"
  })
  .innerJoin("jv", "fiscal_year.id", "jv.fiscal_year_id")
  .innerJoin("project", "jv.project_id", "project.id")

const baseQuery =knex
  .select()
  .from(projectRecovery.as("prh"))
  //.where("fiscal_year", fiscal)

module.exports = {
  required: ["portfolio"],
  getAll: async ({ portfolio }) => {
    const [ report, report_totals] = await Promise.all([
      baseQuery,
      //reportQueries.report(portfolio),
    ]);

    return { report, report_totals };
  },
};
