// libs
const { knex } = require("@database/databaseConnection")();

const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),
};

class ReportService {
  constructor() {
    this.required = ["fiscal"];
  }
  async getReport(fiscal) {
    const { fiscal_year } = await queries.fiscal(fiscal);

    return {
      fiscal_year,
    };
  }

  async getAll(fiscal) {
    const { fiscal_year } = await this.getReport(fiscal);
    return { fiscal_year };
  }
}

const getAll = async ({ fiscal }) => {
  const model = new ReportService();
  const report = await model.getAll(fiscal);
  console.warn(`
  inside model, getting report data:


  ${JSON.stringify(report, null, 2)},

  `);

  return report;
};

module.exports = {
  required: ["fiscal"],
  getAll: getAll,
};
