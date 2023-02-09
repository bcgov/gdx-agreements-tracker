const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const Tab_38_rpt_PF_JVsforFiscal_Quarter = () => {
  const query = knex().raw();

  return query;
};

module.exports = {
  Tab_38_rpt_PF_JVsforFiscal_Quarter,
};
