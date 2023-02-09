const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_16_rpt_P_QuarterlyReview_multiyrsample = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_16_rpt_P_QuarterlyReview_multiyrsample,
};
