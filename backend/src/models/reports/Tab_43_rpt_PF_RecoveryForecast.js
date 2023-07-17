// libs
const { knex } = require("@database/databaseConnection")();

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const reportQueries = {
  fiscalYear: (PARAMETER) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", PARAMETER).first(),
  report: (PARAMETER) =>
    knex
      .select()
      .fromRaw(
        `
        (WITH qry_PF_RecoveryForecast as (
          SELECT
            Project_ID,
            Project_Number,
            Project_Name,
            Recoverable,
            Project_Status,
            Project_Budget.Fiscal,
            Fiscal_Year,
            Sum(Q1_Amount) as Q1_Amount,
            Sum(Q2_Amount) as Q2_Amount,
            Sum(Q3_Amount) as Q3_Amount,
            Sum(Q4_Amount) as Q4_Amount
          FROM
            Project
            INNER JOIN (
              Project_Deliverable
              INNER JOIN (
                Project_Budget
                INNER JOIN Fiscal_Year ON Project_Budget.Fiscal = Fiscal_Year.ID
              ) ON Project_Deliverable.ID = Project_Budget.Project_Deliverable_ID
            ) ON Project.ID = Project_Deliverable.Project_ID
          GROUP BY
            Project_ID,
            Project_Number,
            Project_Name,
            Recoverable,
            Project_Status,
            Project_Budget.Fiscal,
            Fiscal_Year
          order by
            Project_Number asc
        )
        Select
          Project_Number,
          Project_Name,
          Project_Status,
          Recoverable,
          Q1_Amount,
          Q2_Amount,
          Q3_Amount,
          Q4_Amount,
          (
            Q1_Amount + Q2_Amount + Q3_Amount + Q4_Amount
          ) as Total_Forecast,
          fiscal
        from
          qry_PF_RecoveryForecast) AS base`
      )
      .where("fiscal", PARAMETER),

  // report_totals: (PARAMETER) =>
  //   knex.from(baseQuery.as("base")).sum("someColumn").where("someColumn", PARAMETER),
};

module.exports = {
  required: ["fiscal"], // e.g. fiscal, date, or portfolio
  getAll: async ({ fiscal }) => {
    const [{ fiscal_year }, report /*, report_totals*/] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report(fiscal),
      /*
      reportQueries.report_totals(PARAMETER),
      */
    ]);

    const reportData = { fiscal_year, report /*report_totals */ };
    console.warn(JSON.stringify(reportData, null, 2));

    return reportData;
  },
};
