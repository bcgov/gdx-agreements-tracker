const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_17_rpt_P_Status_MostRecent = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_17_rpt_P_Status_MostRecent,
};
