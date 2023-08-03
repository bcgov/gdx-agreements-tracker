const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves the base queries for invoice payments without filtering by fiscal year.
 *
 * @returns {Promise} - A promise that resolves to the query result
 */
const baseQueries = {
  q1: knex.raw(
    `(
      SELECT 
        Project_ID, 
        Fiscal, 
        Sum(Total_Fee_Amount) AS Fees, 
        Sum(Total_Expense_Amount) AS Expenses, 
        Sum(
          Total_Fee_Amount + Total_Expense_Amount
        ) AS Total_Contract 
      FROM 
        Contract c 
      GROUP BY
        Project_ID, 
        Fiscal 
      HAVING 
        (Project_ID IS NOT Null)
      ) AS q1`
  ),

  q2: (fiscal) =>
    knex.raw(
      `(
      select 
    p.ID AS Project_ID, 
    p.Project_Number, 
    p.Project_Name, 
    po.Portfolio_Name, 
    po.Portfolio_Abbrev, 
    p.Total_Project_Budget, 
    p.Recoverable_Amount, 
    Sum(
      Q1_Amount + Q2_Amount + Q3_Amount + Q4_Amount
    ) AS Current_FY_Total_Recoverable, 
    Sum(
      case when Q1_Recovered then Q1_Amount else cast(0 as money) end
    )+ Sum(
      case when Q2_Recovered then Q2_Amount else cast(0 as money) end
    )+ Sum(
      case when Q3_Recovered then Q3_Amount else cast(0 as money) end
    )+ Sum(
      case when Q4_Recovered then Q4_Amount else cast(0 as money) end
    ) as Current_FY_Recovered_To_Date, 
    q1.Fees, 
    q1.Expenses, 
    q1.Total_Contract, 
    pd.Fiscal, 
    fy.Fiscal_Year 
  from 
    Project p 
    right join (
      (
        (
          Fiscal_Year fy 
          right join Project_Deliverable pd on fy.ID = pd.Fiscal
        ) 
        left join ${baseQueries.q1} on (pd.Fiscal = q1.Fiscal) 
        and (pd.Project_ID = q1.Project_ID)
      ) 
      right join (
        Portfolio po 
        right join Project_Budget pb ON po.ID = pb.Recovery_Area
      ) on pd.ID = pb.Project_Deliverable_ID
    ) ON p.ID = pd.Project_ID 
  group by 
    p.ID, 
    p.Project_Number, 
    p.Project_Name, 
    po.Portfolio_Name, 
    po.Portfolio_Abbrev, 
    p.Total_Project_Budget, 
    p.Recoverable_Amount, 
    q1.Fees, 
    q1.Expenses, 
    q1.Total_Contract, 
    pd.Fiscal, 
    fy.Fiscal_Year 
  having 
    pd.fiscal = ?
    )  AS q2`,
    fiscal
    ),
  q3: (fiscal) =>
    knex.raw(
      `(
      select 
    q2.Project_Number, 
    q2.Project_Name, 
    p.Recoverable, 
    q2.Total_Project_Budget, 
    q2.Recoverable_Amount, 
    q2.Total_Contract, 
    q2.Fiscal_Year, 
    Sum(
      case when q2.Portfolio_Abbrev = 'OSS' then q2.Current_FY_Total_Recoverable else null end
    ) AS OSS, 
    Sum(
      case when q2.Portfolio_Abbrev = 'DES' then q2.Current_FY_Total_Recoverable else null end
    ) AS DES, 
    Sum(
      case when q2.Portfolio_Abbrev = 'DMS' then q2.Current_FY_Total_Recoverable else null end
    ) AS DMS, 
    Sum(
      case when q2.Portfolio_Abbrev = 'DP' then q2.Current_FY_Total_Recoverable else null end
    ) AS DP, 
    Sum(
      case when q2.Portfolio_Abbrev = 'ANA' then q2.Current_FY_Total_Recoverable else null end
    ) AS ANA, 
    Sum(
      case when q2.Portfolio_Abbrev = 'SD' then q2.Current_FY_Total_Recoverable else null end
    ) AS SD, 
    Sum(
      case when q2.Portfolio_Abbrev = 'CE' then q2.Current_FY_Total_Recoverable else null end
    ) AS CE, 
    Sum(
      case when q2.Portfolio_Abbrev = 'EDS' then q2.Current_FY_Total_Recoverable else null end
    ) AS EDS, 
    Sum(
      case when q2.Portfolio_Abbrev = 'BCS' then q2.Current_FY_Total_Recoverable else null end
    ) AS BCS, 
    Sum(
      case when q2.Portfolio_Abbrev = 'DIV' then q2.Current_FY_Total_Recoverable else null end
    ) AS DIV, 
    Sum(
      q2.Current_FY_Total_Recoverable
    ) as Current_FY_Recoverable_Total 
  from 
    ${baseQueries.q2(fiscal)} 
    inner join Project p on q2.Project_ID = p.ID 
  group by 
    q2.Project_Number, 
    q2.Project_Name, 
    p.Recoverable, 
    q2.Total_Project_Budget, 
    q2.Recoverable_Amount, 
    q2.Total_Contract, 
    q2.Fiscal_Year
    ) AS q3`
    ),
};

/**
 * Retrieves the final queries for invoice payments, filtered by fiscal year
 *
 * @param   {number | string | Array} fiscal- The fiscal year to grab data for
 * @returns {Promise}                         - A promise that resolves to the query result
 */
const reportQueries = {
  fiscalYear: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // The columns on which to calculate totals.
  columns: {
    total_project_budget: "total_project_budget",
    recoverable_amount: "recoverable_amount",
    non_recoverable: "non_recoverable",
    total_contract: "total_contract",
    bcs: "bcs",
    oss: "oss",
    des: "des",
    dp: "dp",
    ana: "ana",
    dms: "dms",
    sd: "sd",
    ce: "ce",
    current_fy_recoverable_total: "current_fy_recoverable_total",
  },

  // The report query, which builds off of the base queries.
  report: (fiscal) =>
    knex(baseQueries.q3(fiscal))
      .select({
        project_number: "project_number",
        project_name: "project_name",
        recoverable: "recoverable",
        total_project_budget: "total_project_budget",
        recoverable_amount: "recoverable_amount",
        non_recoverable: knex.raw(`total_project_budget - recoverable_amount`),
        total_contract: "total_contract",
        bcs: "bcs",
        oss: "oss",
        des: "des",
        dp: "dp",
        ana: "ana",
        dms: "dms",
        sd: "sd",
        ce: "ce",
        current_fy_recoverable_total: "current_fy_recoverable_total",
      })
      .orderBy("project_number"),

  // Grand totals.
  grandTotals: (fiscal) =>
    knex(reportQueries.report(fiscal).as("report")).sum(reportQueries.columns),
};

module.exports = {
  required: ["fiscal"],
  getAll: async ({ fiscal }) => {
    const [{ fiscal_year }, report, grandTotals] = await Promise.all([
      reportQueries.fiscalYear(fiscal),
      reportQueries.report(fiscal),
      reportQueries.grandTotals(fiscal),
    ]);

    return { fiscal_year, report, grandTotals };
  },
};
