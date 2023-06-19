// Libs
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

//Constants
const name = `$reportName`;

// gets the current date in ISO "YYYY-MM-DD" format.
const getCurrentDate = async () => new Date().toISOString().split("T")[0];

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} fiscal - The fiscal year(s) to retrieve totals for.
 * @returns {Promise}                        - A promise that resolves to the query result containing the totals for recoveries, expenses, net recoveries, and quarterly gross and net amounts.
 */
const queries = {
  [name]: (fiscal) => {
    const query = knex.select(knex.raw());
    return query;
  },
};

module.exports = {
  getAllByFiscal: async (fiscal) => {
    const [date, report] = await Promise.all([getCurrentDate(), queries[name](fiscal)]);

    return {
      date,
      report,
    };
  },
};
