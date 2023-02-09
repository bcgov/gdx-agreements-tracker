const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_42_rpt_PF_PortfolioStobRecoveries = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_42_rpt_PF_PortfolioStobRecoveries,
};
