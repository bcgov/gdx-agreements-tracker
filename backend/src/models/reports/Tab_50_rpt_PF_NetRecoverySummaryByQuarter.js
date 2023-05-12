// const dbConnection = require("@database/databaseConnection");
// const { knex, dataBaseSchemas } = dbConnection();

// const projectTable = `${dataBaseSchemas().data}.project`;

// /**
//  * Gets data for the Divisional Project Reports > net recovery summary by quarter (tab 50)
//  *
//  * @returns {any[]}
//  */

// const Tab_50_rpt_PF_NetRecoverySummaryByQuarter = (requestParams) => {
//   return knex(`${projectTable} as p`).select('*');
// };

// const handleParams = (query, requestParams) => {
//   if (requestParams.fiscal) {
//     query.where("p.fiscal", requestParams.fiscal);
//   }
// };

// module.exports = {
//   Tab_50_rpt_PF_NetRecoverySummaryByQuarter,
// };

const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().config}.form_layouts`;

// Get all.
const Tab_50_rpt_PF_NetRecoverySummaryByQuarter = (requestParams) => {
  return knex(table);
};

module.exports = {
  Tab_50_rpt_PF_NetRecoverySummaryByQuarter,
};
