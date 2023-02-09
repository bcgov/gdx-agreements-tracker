const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_13_rpt_CF_PortfolioSummary = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_13_rpt_CF_PortfolioSummary,
};
