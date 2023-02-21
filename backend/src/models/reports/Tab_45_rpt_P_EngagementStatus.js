const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_45_rpt_P_EngagementStatus = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_45_rpt_P_EngagementStatus,
};