const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_31_rpt_PA_ProjectswithContracts = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_31_rpt_PA_ProjectswithContracts,
};
