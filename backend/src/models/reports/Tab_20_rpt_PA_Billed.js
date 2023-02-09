const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_20_rpt_PA_Billed = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_20_rpt_PA_Billed,
};
