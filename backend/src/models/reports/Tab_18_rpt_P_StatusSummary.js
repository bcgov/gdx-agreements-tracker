const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_18_rpt_P_StatusSummary = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_18_rpt_P_StatusSummary,
};
