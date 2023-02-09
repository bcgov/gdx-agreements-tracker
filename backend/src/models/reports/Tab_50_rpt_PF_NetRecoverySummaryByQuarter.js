const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_50_rpt_PF_NetRecoverySummaryByQuarter = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_50_rpt_PF_NetRecoverySummaryByQuarter,
};
