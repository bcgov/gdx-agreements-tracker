const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param   {number[]} portfolios Optional list of portfolio_ids to limit report to. If empty, returns data for all portfolios.
 * @returns {any[]}
 */

const Tab_1_rpt_C_Summary = (portfolios) => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_1_rpt_C_Summary,
};
