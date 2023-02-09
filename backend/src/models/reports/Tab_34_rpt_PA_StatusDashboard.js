const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_34_rpt_PA_StatusDashboard = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_34_rpt_PA_StatusDashboard,
};
