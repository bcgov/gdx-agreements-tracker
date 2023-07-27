// libs
const { knex } = require("@database/databaseConnection")();
const _ = require("lodash");

// utils
//const { groupByProperty } = require("../../controllers/helpers");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * Uses baseQuery twice, for DRYness
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: ({ fiscal }) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: ({ fiscal }) => {
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
            SUM("6309") AS "consulting_fees",
            SUM("6310") AS "consulting_expenses",
            SUM("6001") AS "operational_contracts_fees",
            SUM("6002") AS "operational_contracts_expenses",
            SUM("57XX") AS "i_expenses",
            SUM("8807") AS "salary_costs",
            SUM("8809") AS "operating_costs",
            SUM("6531") AS "project_related_business_expenses",
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
      .where({ fiscal: fiscal });
    return query;
  },
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
      // Use Promise.all to execute all three queries in parallel, providing the 'fiscal' parameter.
      const fetchedQueryResults = await Promise.all([
        queries?.fiscal({ fiscal }),
        queries?.report({ fiscal }),
        //queries?.totals({ fiscal }),
      ]);

      // Extract the results from the fetched Query Results into individual variables
      const [
        { fiscal_year }, // the result of the 'fiscal' query
        report, // the result of the 'report' query
        totals, // the result of the 'totals' query
      ] = fetchedQueryResults;

      /*const listByPortfolio = (list = [], group = "portfolio_name") => {
        return _.map(_.groupBy(list, group), (portfolioGroup, key) => ({
          [group]: key,
          portfolios: portfolioGroup,
        }));
      }
      */

      const groupProjectsBy = (list = [], group = "portfolio_name") => {
        // Group items in the 'list' based on the 'group' property
        const grouped = list.reduce((acc, item) => {
          const key = item[group];
          acc[key] = acc[key] || [];
          acc[key].push(item);
          return acc;
        }, {});

        // Convert the grouped object into an array of objects
        const result = Object.entries(grouped).map(([key, value]) => {
          return {
            [group]: key,
            projects: value,
          };
        });

        return result;
      };

      const reportsByPortfolio = groupProjectsBy(report, "portfolio_name");

      // create a result object with the fetched data for each section of the report
      // can shape the result as required, e.g. using map or groupByProperty to add sections
      const shapedResult = {
        fiscal: fiscal_year,
        report: reportsByPortfolio,
        totals,
        // add more here, such as 'grand_totals'
      };

      // Log the result object in a readable format to the console.
      // todo: remove this once we hit MVP by mid-September.
      console.warn(JSON.stringify(shapedResult, null, 2));

      // finally, return the shaped result
      return shapedResult;
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
