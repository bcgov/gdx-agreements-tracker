// libs
const { knex } = require("@database/databaseConnection")();
const { fiscalYearTable } = require("@models/useDbTables");
//const _ = require("lodash");

// utils
//const { groupByProperty } = require("@controllers/helpers");

const getFiscalYearFrom = ({ fiscal }) => {
  return knex.select("fiscal_year").from(fiscalYearTable).where("fiscal_year.id", fiscal);
};

const getReportFrom = ({ fiscal }) => {
  const query = knex
    .fromRaw(
      `(
    WITH base AS (
      SELECT
        p.ID Project_ID,
        p.Project_Number,
        p.Project_Name,
        p.Recoverable,
        po.ID Portfolio_ID,
        po.Portfolio_Name,
        po.Portfolio_Abbrev,
        p.Total_Project_Budget,
        p.Recoverable_Amount,
        pb.STOB,
        pb.Q1_Recovered,
        pb.Q1_Amount,
        pb.Q2_Recovered,
        pb.Q2_Amount,
        pb.Q3_Recovered,
        pb.Q3_Amount,
        pb.Q4_Recovered,
        pb.Q4_Amount,
        fy.Fiscal_Year,
        pd.Fiscal
      FROM
        Project_Budget pb
        LEFT JOIN Project_Deliverable pd ON pb.Project_Deliverable_Id = pd.ID
        LEFT JOIN Project p ON pd.Project_ID = p.ID
        LEFT JOIN Fiscal_Year fy ON pd.Fiscal = fy.ID
        LEFT JOIN Portfolio po ON pb.Recovery_Area = po.ID
    ),
    sum_base AS (
      SELECT
        Project_ID,
        Project_Number,
        Project_Name,
        Recoverable,
        Portfolio_ID,
        Portfolio_Name,
        Portfolio_Abbrev,
        Total_Project_Budget,
        Recoverable_Amount,
        STOB,
        SUM(Q1_Amount + Q2_Amount + Q3_Amount + Q4_Amount) AS Current_FY_Total_Recoverable,
        SUM((
          CASE WHEN Q1_Recovered THEN Q1_Amount ELSE CAST(0 AS money) END +
          CASE WHEN Q2_Recovered THEN Q2_Amount ELSE CAST(0 AS money) END +
          CASE WHEN Q3_Recovered THEN Q3_Amount ELSE CAST(0 AS money) END +
          CASE WHEN Q4_Recovered THEN Q4_Amount ELSE CAST(0 AS money) END
        )) AS Current_FY_Recovered_To_Date,
        Fiscal_Year,
        Fiscal
      FROM
        base
      GROUP BY
        Project_ID,
        Project_Number,
        Project_Name,
        Recoverable,
        Portfolio_ID,
        Portfolio_Name,
        Portfolio_Abbrev,
        Total_Project_Budget,
        Recoverable_Amount,
        STOB,
        Fiscal_Year,
        Fiscal
    ),
    sum_stob AS (
      SELECT
        Project_ID,
        Project_Number,
        Project_Name,
        Fiscal,
        Fiscal_Year,
        Recoverable,
        Portfolio_ID,
        Portfolio_Name,
        Portfolio_Abbrev,
        Recoverable_Amount,
        Current_FY_Total_Recoverable,
        Total_Project_Budget,
        SUM(CASE WHEN STOB = '6309' THEN Current_FY_Recovered_To_Date END) AS "6309",
        SUM(CASE WHEN STOB = '6310' THEN Current_FY_Total_Recoverable END) AS "6310",
        SUM(CASE WHEN STOB = '6001' THEN Current_FY_Total_Recoverable END) AS "6001",
        SUM(CASE WHEN STOB = '6002' THEN Current_FY_Total_Recoverable END) AS "6002",
        SUM(CASE WHEN STOB = '8807' THEN Current_FY_Total_Recoverable END) AS "8807",
        SUM(CASE WHEN STOB = '8809' THEN Current_FY_Total_Recoverable END) AS "8809",
        SUM(CASE WHEN STOB = '6531' THEN Current_FY_Total_Recoverable END) AS "6531",
        SUM(CASE WHEN STOB LIKE '57%' THEN Current_FY_Total_Recoverable END) AS "57XX",
        SUM(CASE WHEN STOB NOT IN ('6309', '6310', '6001', '6002', '8807', '8809', '6531') AND STOB NOT LIKE '57%' THEN Current_FY_Total_Recoverable END) AS Other
      FROM
        sum_base
      GROUP BY
        Portfolio_Name,
        Project_ID,
        Project_Number,
        Project_Name,
        Fiscal,
        Fiscal_Year,
        Recoverable,
        Portfolio_ID,
        Portfolio_Abbrev,
        Total_Project_Budget,
        Recoverable_Amount,
        Current_FY_Total_Recoverable
    )
    SELECT
      portfolio_name,
      project_number,
      project_name,
      SUM(Current_FY_Total_Recoverable) AS Sum_Current_FY_Total_Recoverable,
      SUM("6309") AS "6309",
      SUM("6310") AS "6310",
      SUM("6001") AS "6001",
      SUM("6002") AS "6002",
      SUM("57XX") AS "57XX",
      SUM("8807") AS "8807",
      SUM("8809") AS "8809",
      SUM("6531") AS "6531",
      SUM(Other) AS Other,
      Fiscal
    FROM
      sum_stob
    GROUP BY
      portfolio_name,
      project_number,
      project_name,
      Fiscal::integer
    ORDER BY
      portfolio_name,
      project_number,
      project_name ASC
  ) AS base_query`
    )
    .where("fiscal", fiscal)
    .debug();

  return query;
};

//   totals: ({ fiscal }) =>
//     knex
//       .select()
//       .fromRaw(
//         `
//         (
//         SELECT po.id,
//               po.portfolio_name,
//               pb.stob,
//               (pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount) AS recoveries,
//               pd.fiscal
//           FROM data.project_budget AS pb
//           LEFT JOIN data.project_deliverable pd
//             ON pb.project_deliverable_id = pd.id
//           LEFT JOIN data.project AS p
//             ON pd.project_id = p.id
//           LEFT JOIN data.fiscal_year AS fy
//             ON pd.fiscal = fy.id
//           LEFT JOIN data.portfolio AS po
//             ON pb.recovery_area = po.id
//           ) AS br
//         GROUP BY br.portfolio_name,
//                   br.fiscal
//                   SELECT po.portfolio_name,
//                   sum(pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount) AS totals_recoveries,
//                   sum(CASE WHEN pb.stob = '6309' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS consulting_fees,
//                   sum(CASE WHEN pb.stob = '6310' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS consulting_expenses,
//                   sum(CASE WHEN pb.stob = '6001' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS operational_contracts_fees,
//                   sum(CASE WHEN pb.stob = '6002' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS operational_contracts_expenses,
//                   sum(CASE WHEN pb.stob = '5718' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS i_expenses,
//                   sum(CASE WHEN pb.stob = '8807' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS salary_costs,
//                   sum(CASE WHEN pb.stob = '8809' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS operating_costs,
//                   sum(CASE WHEN pb.stob = '6531' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS project_related_business_expenses,
//                   sum(CASE WHEN pb.stob NOT IN ('6531', '8809', '8807', '5718', '6002', '6001', '6310', '6309') THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount END) AS other_stobs,
//                   pd.fiscal
//              FROM data.project_budget AS pb
//              LEFT JOIN data.project_deliverable pd
//                ON pb.project_deliverable_id = pd.id
//              LEFT JOIN data.project AS p
//                ON pd.project_id = p.id
//              LEFT JOIN data.fiscal_year AS fy
//                ON pd.fiscal = fy.id
//              LEFT JOIN data.portfolio AS po
//                ON pb.recovery_area = po.id
//             GROUP BY po.portfolio_name,
//                      pd.fiscal
//             ORDER BY po.portfolio_name;ORDER BY br.portfolio_name
//         ) as base`
//       )
//       .where({
//         fiscal: fiscal,
//       }),
//   grandTotals: ({ fiscal }) =>
//     knex
//       .select()
//       .fromRaw(
//         `(
//           SELECT fiscal,
//             SUM(totals_recoveries) AS total_recoveries_sum,
//             SUM(consulting_fees) AS consulting_fees_sum,
//             SUM(consulting_expenses) AS consulting_expenses_sum,
//             SUM(operational_contracts_fees) AS operational_contracts_fees_sum,
//             SUM(operational_contracts_expenses) AS operational_contracts_expenses_sum,
//             SUM(i_expenses) AS i_expenses_sum,
//             SUM(salary_costs) AS salary_costs_sum,
//             SUM(operating_costs) AS operating_costs_sum,
//             SUM(project_related_business_expenses) AS project_related_business_expenses_sum,
//             SUM(other_stobs) AS other_stobs_sum
//           FROM (
//               SELECT po.portfolio_name,
//                 pb.stob,
//                 SUM(
//                   pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                 ) AS recoveries,
//                 pd.fiscal,
//                 SUM(
//                   pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                 ) AS totals_recoveries,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '6309' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS consulting_fees,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '6310' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS consulting_expenses,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '6001' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS operational_contracts_fees,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '6002' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS operational_contracts_expenses,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '5718' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS i_expenses,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '8807' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS salary_costs,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '8809' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS operating_costs,
//                 SUM(
//                   CASE
//                     WHEN pb.stob = '6531' THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS project_related_business_expenses,
//                 SUM(
//                   CASE
//                     WHEN pb.stob NOT IN (
//                       '6531',
//                       '8809',
//                       '8807',
//                       '5718',
//                       '6002',
//                       '6001',
//                       '6310',
//                       '6309'
//                     ) THEN pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
//                   END
//                 ) AS other_stobs
//               FROM data.project_budget AS pb
//                 LEFT JOIN data.project_deliverable pd ON pb.project_deliverable_id = pd.id
//                 LEFT JOIN data.project AS p ON pd.project_id = p.id
//                 LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
//                 LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
//               GROUP BY po.portfolio_name,
//                 pb.stob,
//                 pd.fiscal
//             ) AS subquery
//           GROUP BY fiscal
//           ) as base
//     `
//       )
//       .where({
//         fiscal: fiscal,
//       }),
// };

// module.exports = {
// required: ["fiscal"],
// getAll: async ({ fiscal }) => {
// Use Promise.all to execute all three queries in parallel, providing the 'fiscal' parameter.
// const { fiscal_year } = await getFiscalYearFrom({ fiscal });
// const reportResult = await getReportFrom({ fiscal });

// const allResults = await Promise.all([
//   getFiscalYearFrom(fiscal),
//   //getReportFrom(fiscal),
//   //queries?.totals({ fiscal }),
//   //queries?.grandTotals({ fiscal }),
// ]);

// Extract the results from the 'allResults' array into individual variables.
// const [{ fiscal_year }, reportResult = [], totalsResult = [], grandTotalsResult = []] =
//   allResults;

// shape model data into format the carbone engine can parse
// const reportByPortfolio = groupByProperty(reportResult, "portfolio_name");
// const reportsByPortfolioWithTotals = reportByPortfolio.map((portfolio) => ({
//   ...portfolio,
//   portfolio_totals: _.keyBy(totalsResult, "portfolio_name")[portfolio.portfolio_name],
// }));

// Create a result object with the fetched data for each aspect of the fiscal period.
// const result = {
//   fiscal: fiscal_year,
//   // report: reportsByPortfolioWithTotals ?? [],
//   //grand_totals: grandTotalsResult ?? [],
// };

//   return {
//     fiscal: fiscal_year,
//     report: reportResult,
//   };
// },
// };
//
module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    try {
      const { fiscal_year } = await getFiscalYearFrom({ fiscal });
      const reportResult = await getReportFrom({ fiscal });

      // const [[{ fiscal_year }], report, report_totals] = await Promise.all([
      //   queries.fiscalYear(fiscal),
      //   queries.report(fiscal),
      //   queries.totals(fiscal),
      // ]);

      return {
        fiscal: fiscal_year,
        report: reportResult,
        //report_totals,
      };
    } catch (error) {
      console.error(`
        Model error!:
        query parameter received: ${JSON.stringify(fiscal)}
        **** ${error} ****
        returning NULL!.
      `);

      return null;
    }
  },
};
