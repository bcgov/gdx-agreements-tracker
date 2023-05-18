SELECT jv.project_id,
  jv.jv_number,
  jv.billed_date,
  project.project_number,
  project.project_name,
  jv.amount,
  fiscal_year.fiscal_year,
  jv.fiscal_year_id AS fiscal,
  jv.quarter
FROM data.fiscal_year
  INNER JOIN (
    data.project
    RIGHT JOIN data.jv ON project.id = jv.project_id
  ) ON data.fiscal_year.id = jv.fiscal_year_id
ORDER BY project.project_number;
--Query: qry_PF_FinanceRecoverySummary
-- SQL:
SELECT qry_current_year_recoveries_stob_noparam.project_id,
  qry_current_year_recoveries_stob_noparam.project_number,
  qry_current_year_recoveries_stob_noparam.project_name,
  qry_current_year_recoveries_stob_noparam.fiscal,
  qry_current_year_recoveries_stob_noparam.fiscal_year,
  qry_current_year_recoveries_stob_noparam.recoverable,
  qry_current_year_recoveries_stob_noparam.portfolio_id,
  qry_current_year_recoveries_stob_noparam.portfolio_name,
  qry_current_year_recoveries_stob_noparam.portfolio_abbrev,
  qry_current_year_recoveries_stob_noparam.total_project_budget,
  qry_current_year_recoveries_stob_noparam.recoverable_amount,
  SUM(
    qry_current_year_recoveries_stob_noparam.current_fy_total_recoverable
  ) AS sum_of_current_fy_total_recoverable
FROM qry_current_year_recoveries_stob_noparam
GROUP BY qry_current_year_recoveries_stob_noparam.project_id,
  qry_current_year_recoveries_stob_noparam.project_number,
  qry_current_year_recoveries_stob_noparam.project_name,
  qry_current_year_recoveries_stob_noparam.fiscal,
  qry_current_year_recoveries_stob_noparam.fiscal_year,
  qry_current_year_recoveries_stob_noparam.recoverable,
  qry_current_year_recoveries_stob_noparam.portfolio_id,
  qry_current_year_recoveries_stob_noparam.portfolio_name,
  qry_current_year_recoveries_stob_noparam.portfolio_abbrev,
  qry_current_year_recoveries_stob_noparam.total_project_budget,
  qry_current_year_recoveries_stob_noparam.recoverable_amount PIVOT (
    SUM(
      qry_current_year_recoveries_stob_noparam.current_fy_total_recoverable
    ) FOR CASE
      WHEN stob IN (
        '6309',
        '6310',
        '6001',
        '6002',
        '8807',
        '8809',
        '6531'
      )
      OR stob LIKE '57%' THEN CASE
        WHEN stob LIKE '57%' THEN '57XX'
        ELSE stob
      END
      ELSE 'Other'
    END IN (
      6309,
      6310,
      6001,
      6002,
      '57XX',
      8807,
      8809,
      6531,
      'Other'
    )
  ) AS pivot_table;
--Query: qry_CurrentYearRecoveries -STOB_NoParam
-- SQL:
SELECT qry_current_year_recoveries_stob_base.project_id,
  qry_current_year_recoveries_stob_base.project_number,
  qry_current_year_recoveries_stob_base.project_name,
  qry_current_year_recoveries_stob_base.recoverable,
  qry_current_year_recoveries_stob_base.portfolio_id,
  qry_current_year_recoveries_stob_base.portfolio_name,
  qry_current_year_recoveries_stob_base.portfolio_abbrev,
  qry_current_year_recoveries_stob_base.total_project_budget,
  qry_current_year_recoveries_stob_base.recoverable_amount,
  qry_current_year_recoveries_stob_base.stob,
  SUM(q1_amount + q2_amount + q3_amount + q4_amount) AS current_fy_total_recoverable,
  SUM(
    CASE
      WHEN q1_recovered THEN q1_amount
      ELSE 0
    END + CASE
      WHEN q2_recovered THEN q2_amount
      ELSE 0
    END + CASE
      WHEN q3_recovered THEN q3_amount
      ELSE 0
    END + CASE
      WHEN q4_recovered THEN q4_amount
      ELSE 0
    END
  ) AS current_fy_recovered_to_date,
  qry_current_year_recoveries_stob_base.fiscal_year,
  qry_current_year_recoveries_stob_base.fiscal
FROM qry_current_year_recoveries_stob_base
GROUP BY qry_current_year_recoveries_stob_base.project_id,
  qry_current_year_recoveries_stob_base.project_number,
  qry_current_year_recoveries_stob_base.project_name,
  qry_current_year_recoveries_stob_base.recoverable,
  qry_current_year_recoveries_stob_base.portfolio_id,
  qry_current_year_recoveries_stob_base.portfolio_name,
  qry_current_year_recoveries_stob_base.portfolio_abbrev,
  qry_current_year_recoveries_stob_base.total_project_budget,
  qry_current_year_recoveries_stob_base.recoverable_amount,
  qry_current_year_recoveries_stob_base.stob,
  qry_current_year_recoveries_stob_base.fiscal_year,
  qry_current_year_recoveries_stob_base.fiscal;
--Query: qry_CurrentYearRecoveries - STOB
-- SQL: PARAMETERS [Enter Fiscal:] Text (255);
SELECT stob_base.project_id,
  stob_base.project_number,
  stob_base.project_name,
  stob_base.recoverable,
  stob_base.portfolio_id,
  stob_base.portfolio_name,
  stob_base.portfolio_abbrev,
  stob_base.total_project_budget,
  stob_base.recoverable_amount,
  stob_base.stob,
  SUM(
    stob_base.q1_amount + stob_base.q2_amount + stob_base.q3_amount + stob_base.q4_amount
  ) AS current_fy_total_recoverable,
  SUM(
    CASE
      WHEN stob_base.q1_recovered THEN stob_base.q1_amount
      ELSE 0
    END + CASE
      WHEN stob_base.q2_recovered THEN stob_base.q2_amount
      ELSE 0
    END + CASE
      WHEN stob_base.q3_recovered THEN stob_base.q3_amount
      ELSE 0
    END + CASE
      WHEN stob_base.q4_recovered THEN stob_base.q4_amount
      ELSE 0
    END
  ) AS current_fy_recovered_to_date,
  stob_base.fiscal_year
FROM stob_base
GROUP BY stob_base.project_id,
  stob_base.project_number,
  stob_base.project_name,
  stob_base.recoverable,
  stob_base.portfolio_id,
  stob_base.portfolio_name,
  stob_base.portfolio_abbrev,
  stob_base.total_project_budget,
  stob_base.recoverable_amount,
  stob_base.stob,
  stob_base.fiscal_year
HAVING stob_base.fiscal_year = [Enter Fiscal:];
/* DONE
 --Query: qry_CurrentYearRecoveries-STOB_Base
 --SQL:
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
 FROM data.project_budget AS pb
 LEFT JOIN data.project_deliverable AS pd ON pb.project_deliverable_id = pd.id
 LEFT JOIN data.project AS p ON pd.project_id = p.id
 LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
 LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
 WHERE fiscal_year = '21-22'
 GROUP BY po.portfolio_name,
 p.id,
 p.project_number,
 p.project_name,
 p.recoverable,
 po.id,
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
 ORDER BY portfolio_name,
 project_number
 */