const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

const fiscalYear = (fiscal) => {
  const query = knex().raw();
  return query;
}

const report = (fiscal) => {
  const query = knex().raw();
  return query;
}

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @returns {any[]}
 */
const getAll = () => {
  async (query) => {
    try {
      const { fiscal } = query;
      const [[{ fiscal_year }], report ] = await Promise.all([
        fiscalYear(fiscal),
        report(fiscal),
      ]);

      return {
        fiscal: fiscal_year,
        report,
      };
    } catch (error) {
      console.error(`
        Model error!:
        query parameter received: ${JSON.stringify(query)}
        **** ${error} ****
        returning NULL!.
      `);

      return null;
    }
  },
};

module.exports = {
  required: ["fiscal"],
  getAll
};
