const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_14_rpt_P_BudgetSummary = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_14_rpt_P_BudgetSummary,
};
