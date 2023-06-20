// Libs
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves the data from the model
 *
 * @param   {number | string | Array} params- The parameters for the queries, e.g. fiscal, portfolios[], etc.
 * @returns {Promise}                         - A promise that resolves to the query result containing properties like: totals for recoveries, expenses, net recoveries, and quarterly gross and net amounts.
 */
const queries = {
  report: (params) => {
    const query = knex.select(knex.raw());
    return query;
  },
};

module.exports = {
  // destructure params for each report model
  // example getAll: async ({ fiscal }) => { .... }
  getAll: async (params) => {
    const [report] = await Promise.all([queries.report(params)]);

    return {
      report,
    };
  },
};
