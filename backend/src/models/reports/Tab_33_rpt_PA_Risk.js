//const dbConnection = require("@database/databaseConnection");
//const { knex } = dbConnection();

const getReport = (portfolio) => {
  const query = "removeme"; //knex().raw();
  return query;
};

module.exports = {
  required: [],
  getAll: async (query) => {
    const { portfolio } = query;
    const [report] = await Promise.all([getReport(portfolio)]);
    return { report };
  },
};
