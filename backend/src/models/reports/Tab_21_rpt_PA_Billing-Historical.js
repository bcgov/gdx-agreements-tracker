const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

const getReport = (portfolio) => {
  const query = knex.raw(
    `set 
    search_path = data;
  WITH qry_Project_Recovery_Historical as (
    SELECT 
      Historical_Projects.Project_Number, 
      Historical_Projects.Project_Name, 
      Historical_Projects.Total_Project_Budget, 
      Fiscal_Year.Fiscal_Year AS Budget_Fiscal, 
      Historical_Project_Billing.Q1, 
      Historical_Project_Billing.Q2, 
      Historical_Project_Billing.Q3, 
      Historical_Project_Billing.Q4, 
      cast(
        COALESCE(Q1, '0') + COALESCE(Q2, '0') + COALESCE(Q3, '0') + COALESCE(Q4, '0') as money
      ) AS Total_Recovered 
    FROM 
      Historical_Projects 
      INNER JOIN (
        Fiscal_Year 
        INNER JOIN Historical_Project_Billing ON Fiscal_Year.ID = Historical_Project_Billing.Fiscal_Year
      ) ON Historical_Projects.Project_Number = Historical_Project_Billing.Project_Number 
    GROUP BY 
      Historical_Projects.Project_Number, 
      Historical_Projects.Project_Name, 
      Historical_Projects.Total_Project_Budget, 
      Fiscal_Year.Fiscal_Year, 
      Historical_Project_Billing.Q1, 
      Historical_Project_Billing.Q2, 
      Historical_Project_Billing.Q3, 
      Historical_Project_Billing.Q4
  ), 
  qry_Project_Recovery as (
    SELECT 
      Project.ID AS Project_ID, 
      Project.Project_Number, 
      Project.Project_Name, 
      Project.Total_Project_Budget, 
      Fiscal_Year.Fiscal_Year, 
      Sum(
        case when Quarter = '1' then Amount else null end
      ) AS Q1, 
      Sum(
        case when Quarter = '2' then Amount else null end
      ) AS Q2, 
      Sum(
        case when Quarter = '3' then Amount else null end
      ) AS Q3, 
      Sum(
        case when Quarter = '4' then Amount else null end
      ) AS Q4, 
      Sum(JV.Amount) AS Total_Recovered 
    FROM 
      Fiscal_Year 
      INNER JOIN (
        Project 
        INNER JOIN JV ON Project.ID = JV.Project_ID
      ) ON Fiscal_Year.ID = JV.Fiscal_Year_ID 
    GROUP BY 
      Project.ID, 
      Project.Project_Number, 
      Project.Project_Name, 
      Project.Total_Project_Budget, 
      Fiscal_Year.Fiscal_Year
  ) 
  SELECT 
    Project_Number, 
    Project_Name, 
    Total_Project_Budget, 
    Q1, 
    Q2, 
    Q3, 
    Q4, 
    cast(
      COALESCE(Q1, '0')+ COALESCE(Q2, '0')+ COALESCE(Q3, '0')+ COALESCE(Q4, '0') as money
    ) AS Total_Recovered 
  FROM 
    qry_Project_Recovery_Historical 
  UNION ALL 
  SELECT 
    Project_Number, 
    Project_Name, 
    Total_Project_Budget, 
    Q1, 
    Q2, 
    Q3, 
    Q4, 
    Total_Recovered 
  FROM 
    qry_Project_Recovery 
  order by 
    Project_Number asc;
  `
  );
  return query;
};

module.exports = {
  required: ["portfolio"],
  getAll: async (query) => {
    const { portfolio } = query;
    const [report] = await Promise.all([getReport(portfolio)]);
    return { report };
  },
};
