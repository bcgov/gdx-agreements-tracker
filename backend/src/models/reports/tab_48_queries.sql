-- Main query
--Query:qry_PF_FinanceRecoverySummary
--SQL:
SELECT "qry_current_year_recoveries_stob_no_param"."project_id",
  "qry_current_year_recoveries_stob_no_param"."project_number",
  "qry_current_year_recoveries_stob_no_param"."project_name",
  "qry_current_year_recoveries_stob_no_param"."fiscal",
  "qry_current_year_recoveries_stob_no_param"."fiscal_year",
  "qry_current_year_recoveries_stob_no_param"."recoverable",
  "qry_current_year_recoveries_stob_no_param"."portfolio_id",
  "qry_current_year_recoveries_stob_no_param"."portfolio_name",
  "qry_current_year_recoveries_stob_no_param"."portfolio_abbrev",
  "qry_current_year_recoveries_stob_no_param"."total_project_budget",
  "qry_current_year_recoveries_stob_no_param"."recoverable_amount",
  SUM(
    CASE
      WHEN "qry_current_year_recoveries_stob_no_param"."stob" IN ('6309', '6310', '6001', '6002', '8807', '8809', '6531')
      OR "qry_current_year_recoveries_stob_no_param"."stob" LIKE '57%' THEN "qry_current_year_recoveries_stob_no_param"."current_fy_total_recoverable"
      ELSE 0
    END
  ) AS "SumOfCurrentFYTotalRecoverable"
FROM "qry_current_year_recoveries_stob_no_param"
GROUP BY "qry_current_year_recoveries_stob_no_param"."project_id",
  "qry_current_year_recoveries_stob_no_param"."project_number",
  "qry_current_year_recoveries_stob_no_param"."project_name",
  "qry_current_year_recoveries_stob_no_param"."fiscal",
  "qry_current_year_recoveries_stob_no_param"."fiscal_year",
  "qry_current_year_recoveries_stob_no_param"."recoverable",
  "qry_current_year_recoveries_stob_no_param"."portfolio_id",
  "qry_current_year_recoveries_stob_no_param"."portfolio_name",
  "qry_current_year_recoveries_stob_no_param"."portfolio_abbrev",
  "qry_current_year_recoveries_stob_no_param"."total_project_budget",
  "qry_current_year_recoveries_stob_no_param"."recoverable_amount";
/* DONE
 --Query: qry_CurrentYearRecoveries -STOB_NoParam
 
 -- SQL:
 WITH stob_base AS (
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
 ) -- end stob_base
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
 SUM(q1_amount + q2_amount + q3_amount + q4_amount) AS current_fy_total_recoverable,
 SUM(
 CASE
 WHEN q1_recovered THEN q1_amount
 ELSE 0::money
 END + CASE
 WHEN q2_recovered THEN q2_amount
 ELSE 0::money
 END + CASE
 WHEN q3_recovered THEN q3_amount
 ELSE 0::money
 END + CASE
 WHEN q4_recovered THEN q4_amount
 ELSE 0::money
 END
 ) AS current_fy_recovered_to_date,
 stob_base.fiscal_year,
 stob_base.fiscal
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
 stob_base.fiscal_year,
 stob_base.fiscal;
 -- end qry_CurrentYearRecoveries-STOB_NoParam
 */
/* DONE
 --Query: qry_CurrentYearRecoveries-STOB
 --SQL:
 WITH stob_base AS (
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
 )
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
 sum(
 stob_base.q1_amount + stob_base.q2_amount + stob_base.q3_amount + stob_base.q4_amount
 ) AS current_fy_total_recoverable,
 sum(
 CASE
 WHEN stob_base.q1_recovered THEN stob_base.q1_amount
 ELSE 0::MONEY
 END + CASE
 WHEN stob_base.q2_recovered THEN stob_base.q2_amount
 ELSE 0::MONEY
 END + CASE
 WHEN stob_base.q3_recovered THEN stob_base.q3_amount
 ELSE 0::MONEY
 END + CASE
 WHEN stob_base.q4_recovered THEN stob_base.q4_amount
 ELSE 0::MONEY
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
 HAVING stob_base.fiscal_year = '21-22'
 -- end qry_currentYearRecoveries-STOB*/
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