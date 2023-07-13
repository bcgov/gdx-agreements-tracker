const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves historical recoveries.
 *
 * @param   {string}            portfolio - Portfolio value to filter the report.
 * @returns {Knex.QueryBuilder}           Knex query builder for fetching report totals.
 */
const baseQueries = {
  projectRecoveryHistorical: knex("historical_projects")
    .select({
      project_number: "historical_projects.project_number",
      project_name: "historical_projects.project_name",
      total_project_budget: "historical_projects.total_project_budget",
      budget_fiscal: "fiscal_year.fiscal_year",
      q1: "historical_project_billing.q1",
      q2: "historical_project_billing.q2",
      q3: "historical_project_billing.q3",
      q4: "historical_project_billing.q4",
      total_recovered: knex.raw(
        "cast( COALESCE(Q1, '0') + COALESCE(Q2, '0') + COALESCE(Q3, '0') + COALESCE(Q4, '0') as money)"
      ),
    })
    .innerJoin("fiscal_year", "historical_projects.fiscal_year", "fiscal_year.id")
    .innerJoin(
      "historical_project_billing",
      "historical_projects.project_number",
      "historical_project_billing.project_number"
    )
    .groupBy(
      "historical_projects.project_number",
      "historical_projects.project_name",
      "historical_projects.total_project_budget",
      "fiscal_year.fiscal_year",
      "historical_project_billing.q1",
      "historical_project_billing.q2",
      "historical_project_billing.q3",
      "historical_project_billing.q4"
    ),

  projectRecovery: knex("fiscal_year")
    .select({
      project_id: "project.id",
      project_number: "project.project_number",
      project_name: "project.project_name",
      total_project_budget: "project.total_project_budget",
      fiscal_year: "fiscal_year.fiscal_year",
      q1: knex.raw(`sum(case when quarter = '1' then amount else null end)`),
      q2: knex.raw(`sum(case when quarter = '2' then amount else null end)`),
      q3: knex.raw(`sum(case when quarter = '3' then amount else null end)`),
      q4: knex.raw(`sum(case when quarter = '4' then amount else null end)`),
      total_recovered: knex.sum("jv.amount"),
    })
    .innerJoin("jv", "fiscal_year.id", "jv.fiscal_year_id")
    .innerJoin("project", "jv.project_id", "project.id")
    .groupBy(
      "project.id",
      "project.project_number",
      "project.total_project_budget",
      "fiscal_year.fiscal_year"
    ),
};

const reportQueries = {
  report: () =>
    knex
      .select({
        budget_fiscal: "project_recovery_historical.budget_fiscal",
        project_number: "project_recovery_historical.project_number",
        project_name: "project_recovery_historical.project_name",
        total_project_budget: "project_recovery_historical.total_project_budget",
        q1: "project_recovery_historical.q1",
        q2: "project_recovery_historical.q2",
        q3: "project_recovery_historical.q3",
        q4: "project_recovery_historical.q4",
        total_recovered: knex.raw(
          "cast( COALESCE(Q1, '0') + COALESCE(Q2, '0') + COALESCE(Q3, '0') + COALESCE(Q4, '0') as money)"
        ),
      })
      .from(baseQueries.projectRecoveryHistorical.as("project_recovery_historical"))
      .unionAll([
        knex
          .select({
            budget_fiscal: "project_recovery.fiscal_year",
            project_number: "project_recovery.project_number",
            project_name: "project_recovery.project_name",
            total_project_budget: "project_recovery.total_project_budget",
            q1: "q1",
            q2: "q2",
            q3: "q3",
            q4: "q4",
            total_recovered: "total_recovered",
          })
          .from(baseQueries.projectRecovery.as("project_recovery"))
          .orderBy("project_number"),
      ]),
};

module.exports = {
  required: ["portfolio"],
  getAll: async ({}) => {
    const [report] = await Promise.all([reportQueries.report()]);

    return { report };
  },
};
