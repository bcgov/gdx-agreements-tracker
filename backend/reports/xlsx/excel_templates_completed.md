# excel template reports completed so far

- [ ]  Tab_10_rpt_CA_MultiYrStats_ConsultingServicesbyPortfolio
- [ ]  Tab_12_rpt_CF_InvoicePaymentsbyPortfolio
- [ ]  Tab_13_rpt_CF_PortfolioSummary
- [ ]  Tab_14_rpt_P_BudgetSummary
- [ ]  Tab_15_rpt_P_QuarterlyBillingRequest
- [ ]  Tab_16_rpt_P_QuarterlyReview
- [ ]  Tab_17_rpt_P_Status_MostRecent
- [ ]  Tab_18_rpt_P_StatusSummary
- [ ]  Tab_19_rpt_PA_ActiveProjectsbyPortfolio
- [ ]  Tab_1_rpt_C_Summary
- [x]  Tab_20_rpt_PA_Billed
- [x]  Tab_21_rpt_PA_Billing-Historical
- [ ]  Tab_24_rpt_PA_Gantt
- [ ]  Tab_25_rpt_PA_LessonsLearnedbyCategory
- [ ]  Tab_26_rpt_PA_Milestone
- [ ]  Tab_31_rpt_PA_ProjectswithContracts
- [ ]  Tab_34_rpt_PA_StatusDashboard
- [ ]  Tab_35_rpt_PA_StatusPortfolioRollup
- [x]  Tab_38_rpt_PF_JVsforFiscal-Quarter
- [ ]  Tab_42_rpt_PF_PortfolioStobRecoveries
- [x]  Tab_43_rpt_PF_RecoveryForecast
- [ ]  Tab_45_rpt_P_EngagementStatus
- [ ]  Tab_44_rpt_PF_RecoveryToDateDetails
- [ ]  Tab_46_rpt_PA_EngagementExecutiveRollup
- [ ]  Tab_47_rpt_PA_EngagementStatusSummary
- [x]  Tab_48_rpt_PF_FinanceRecoverySummary
- [ ]  Tab_49_rpt_PF_NetRecoveries
- [ ]  Tab_4_rpt_CA_Capital_GDX
- [x]  Tab_50_rpt_PF_NetRecoverySummaryByQuarter
- [ ]  rpt_PA_ChangeRequestTypesFY-Summary
- [ ]  rpt_PA_Fiscal_Registry
- [ ]  rpt_PA_Ministry
- [ ]  rpt_PA_Registered


## blank templates for models

- [x]  rpt_PA_Registered
- [x]  rpt_PA_Ministry
- [x]  rpt_PA_Fiscal_Registry
- [x]  rpt_PA_ChangeRequestTypesFYSummary
- [x]  Tab_53_rpt_PF_FinProjectForecast-NEW
- [x]  Tab_51_rpt_PF_ADIExport
- [ ]  Tab_50_rpt_PF_NetRecoverySummaryByQuarter
- [x]  Tab_4_rpt_CA_Capital_GDX
- [x]  Tab_49_rpt_PF_NetRecoveries
- [ ]  Tab_48_rpt_PF_FinanceRecoverySummary
- [x]  Tab_47_rpt_PA_EngagementStatusSummary
- [x]  Tab_46_rpt_PA_EngagementExecutiveRollup
- [x]  Tab_45_rpt_P_EngagementStatus
- [x]  Tab_44_rpt_PF_RecoveryToDateDetails
- [ ]  Tab_43_rpt_PF_RecoveryForecast
- [x]  Tab_42_rpt_PF_PortfolioStobRecoveries
- [x]  Tab_41_rpt_PF_PortfolioStaffRecoveries
- [x]  Tab_40_rpt_PF_PortfolioAdminFees
- [x]  Tab_39_rpt_PF_PortfolioForecastAll
- [ ]  Tab_38_rpt_PF_JVsforFiscal-Quarter
- [x]  Tab_37_rpt_PF_BudgetDistributionbyPortfolio
- [x]  Tab_36_rpt_PF_BudgetbySTOB
- [x]  Tab_35_rpt_PA_StatusPortfolioRollup
- [x]  Tab_34_rpt_PA_StatusDashboard
- [x]  Tab_33_rpt_PA_Risk
- [x]  Tab_32_rpt_PA_Registered
- [x]  Tab_31_rpt_PA_ProjectswithContracts
- [x]  Tab_30_rpt_PA_MultiYrStats_DMS_Office
- [x]  Tab_29_rpt_PA_MultiYrStatsChangeRequest
- [x]  Tab_28_rpt_PA_MultiYrStats
- [x]  Tab_27_rpt_PA_Ministry
- [x]  Tab_26_rpt_PA_Milestone
- [x]  Tab_25_rpt_PA_LessonsLearnedbyCategory
- [x]  Tab_24_rpt_PA_Gantt
- [x]  Tab_23_rpt_PA_Fiscal_Registry
- [x]  Tab_22_rpt_PA_ChangeRequestTypesFY-Summary
- [ ]  Tab_21_rpt_PA_Billing-Historical
- [ ]  Tab_20_rpt_PA_Billed
- [x]  Tab_1_rpt_C_Summary
- [x]  Tab_19_rpt_PA_ActiveProjectsbyPortfolio
- [x]  Tab_18_rpt_P_StatusSummary
- [x]  Tab_17_rpt_P_Status_MostRecent
- [x]  Tab_16_rpt_P_QuarterlyReview
- [x]  Tab_15_rpt_P_QuarterlyBillingRequest
- [x]  Tab_14_rpt_P_BudgetSummary
- [x]  Tab_13_rpt_CF_PortfolioSummary
- [x]  Tab_12_rpt_CF_InvoicePaymentsbyPortfolio
- [x]  Tab_10_rpt_CA_MultiYrStats_ConsultingServicesbyPortfolio


### 8-step report build
1. build a report template in Excel that matches the columns of the query and the style of the sample report
3. get the query from the ticket into PgAdmin and make it work with the fiscal / portfolio / quarter parameter expected
2. configure the front end menu selector for this report to select the parameters needed
4. build a backend model that produces JSON output that matches the columns in the PgAdmin query
5. build the totals and other queries in pgadmin so their columns match the sample report's totals/other sections
6. build a backend model for those total and other queries that produce JSON output matching the columns in PgAdmin
7. get JSON data to populate in excel template for all of the model output, including totals/other
8. finish styling on the template, and correct any carbone templating errors