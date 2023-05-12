--Query: qry_PF_NetRecoverySummaryByQuarter
-- SQL:
SELECT qry_currentyearrecoveries_stob_base.fiscalyear,
  qry_currentyearrecoveries_stob_base.fiscal,
  qry_currentyearrecoveries_stob_base.portfolioid,
  qry_currentyearrecoveries_stob_base.portfolioname,
  qry_currentyearrecoveries_stob_base.portfolioabbrev,
  Sum(qry_currentyearrecoveries_stob_base.q1_amount) AS q1_amount,
  Sum(
    CASE
      WHEN LEFT(stob, 2) IN ('57', '65', '63', '60') THEN qry_currentyearrecoveries_stob_base.q1_amount
      ELSE 0
    END
  ) AS q1_expenses,
  Sum(qry_currentyearrecoveries_stob_base.q2_amount) AS q2_amount,
  Sum(
    CASE
      WHEN LEFT(stob, 2) IN ('57', '65', '63', '60') THEN qry_currentyearrecoveries_stob_base.q2_amount
      ELSE 0
    END
  ) AS q2_expenses,
  Sum(qry_currentyearrecoveries_stob_base.q3_amount) AS q3_amount,
  Sum(
    CASE
      WHEN LEFT(stob, 2) IN ('57', '65', '63', '60') THEN qry_currentyearrecoveries_stob_base.q3_amount
      ELSE 0
    END
  ) AS q3_expenses,
  Sum(qry_currentyearrecoveries_stob_base.q4_amount) AS q4_amount,
  Sum(
    CASE
      WHEN LEFT(stob, 2) IN ('57', '65', '63', '60') THEN qry_currentyearrecoveries_stob_base.q4_amount
      ELSE 0
    END
  ) AS q4_expenses
FROM qry_currentyearrecoveries_stob_base
GROUP BY qry_currentyearrecoveries_stob_base.fiscalyear,
  qry_currentyearrecoveries_stob_base.fiscal,
  qry_currentyearrecoveries_stob_base.portfolioid,
  qry_currentyearrecoveries_stob_base.portfolioname,
  qry_currentyearrecoveries_stob_base.portfolioabbrev;
--
-- Query: qry_CurrentYearRecoveries-STOB_Base
-- SQL:
select p.ID ProjectID,
  p.ProjectNumber,
  p.ProjectName,
  p.Recoverable,
  po.ID PortfolioID,
  po.PortfolioName,
  po.PortfolioAbbrev,
  p.TotalProjectBudget,
  p.RecoverableAmount,
  pb.STOB,
  pb.Q1_Recovered,
  pb.Q1_Amount,
  pb.Q2_Recovered,
  pb.Q2_Amount,
  pb.Q3_Recovered,
  pb.Q3_Amount,
  pb.Q4_Recovered,
  pb.Q4_Amount,
  fy.FiscalYear,
  pd.Fiscal
from ProjectBudget pb
  left join ProjectDeliverable pd on pb.ProjectDeliverableId = pd.ID
  left join Project p on pd.ProjectID = p.ID
  left join FiscalYear fy on pd.Fiscal = fy.ID
  left join Portfolio po on pb.RecoveryArea = po.ID --

  -- Query: qry_CurrentYearRecoveries-STOB_Base
  -- SQL:
SELECT p.id AS project_id,
  p.project_number,
  p.project_name,
  p.recoverable,
  po.id AS portfolio_id,
  po.portfolio_name,
  po.portfolio_abbrev,
  p.total_project_budget,
  p.recoverable_amount,
  pb.stob,
  pb.q1_recovered,
  pb.q1_amount,
  pb.q2_recovered,
  pb.q2_amount,
  pb.q3_recovered,
  pb.q3_amount,
  pb.q4_recovered,
  pb.q4_amount,
  fy.fiscal_year,
  pd.fiscal
FROM project_budget pb
  LEFT JOIN project_deliverable pd ON pb.project_deliverable_id = pd.id
  LEFT JOIN project p ON pd.project_id = p.id
  LEFT JOIN fiscal_year fy ON pd.fiscal = fy.id
  LEFT JOIN portfolio po ON pb.recovery_area = po.id;