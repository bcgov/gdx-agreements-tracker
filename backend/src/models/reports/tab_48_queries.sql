-- Main query
/*
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
 WHEN "qry_current_year_recoveries_stob_no_param"."stob" IN (
 '6309',
 '6310',
 '6001',
 '6002',
 '8807',
 '8809',
 '6531'
 )
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
 */
--Query: qry_CurrentYearRecoveries -STOB_NoParam
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
  SUM(
    pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount
  ) AS current_fy_total_recoverable,
  SUM(
    CASE
      WHEN pb.q1_recovered THEN pb.q1_amount
      ELSE 0::money
    END + CASE
      WHEN pb.q2_recovered THEN pb.q2_amount
      ELSE 0::money
    END + CASE
      WHEN pb.q3_recovered THEN pb.q3_amount
      ELSE 0::money
    END + CASE
      WHEN pb.q4_recovered THEN pb.q4_amount
      ELSE 0::money
    END
  ) AS current_fy_recovered_to_date,
  fy.fiscal_year,
  pd.fiscal
FROM data.project_budget AS pb
  LEFT JOIN data.project_deliverable AS pd ON pb.project_deliverable_id = pd.id
  LEFT JOIN data.project AS p ON pd.project_id = p.id
  LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
  LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
GROUP BY p.id,
  p.project_number,
  p.project_name,
  p.recoverable,
  po.id,
  po.portfolio_name,
  po.portfolio_abbrev,
  p.total_project_budget,
  p.recoverable_amount,
  pb.stob,
  fy.fiscal_year,
  pd.fiscal;