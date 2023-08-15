import { IReportCategoriesAndTypes } from "types";

export const categoriesAndTypes: IReportCategoriesAndTypes = [
  {
    value: "individual_project_reports",
    label: "Individual Project Reports",
    types: [
      {
        value: "Tab_17_rpt_P_Status_MostRecent",
        label: "Project Status (Most Recent)",
        description:
          "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status and milestone status.",
        parameters: ["project"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_18_rpt_P_StatusSummary",
        label: "Project Status Summary",
        description:
          "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, all status reporting, deliverable status and milestone status and Closure Report.",
        parameters: ["project"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_14_rpt_P_BudgetSummary",
        label: "Projects Budget Summary",
        description:
          "Runs by Project #, shows deliverable amounts, their budgets, amounts recovered to date, balance remaining. Shows breakdown across fiscals, any change requests, any contracts associated with the project and amounts invoiced/remaining on the contracts.",
        parameters: ["project"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_16_rpt_P_QuarterlyReview",
        label: "Project Quarterly Review",
        description:
          "Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter and portfolio recovery amount.",
        parameters: ["project"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_15_rpt_P_QuarterlyBillingRequest",
        label: "Project Quarterly Billing Request",
        description:
          "Runs on Project #, fiscal yr, quarter. Shows client billing information, summaries the breakdown charged per deliverable for the specific quarter/fiscal.",
        parameters: ["project", "fiscal", "quarter"],
        exportPDF: true,
        exportXLSX: false,
      },
    ],
  },
  {
    value: "individual_contract_reports",
    label: "Individual Contract Reports",
    types: [
      {
        value: "Tab_1_rpt_C_Summary",
        label: "Contract Summary",
        description:
          "Summary report for an individualContract outlines initial setup, internal CAS Coding information, Invoices Process, Contract Payment Summary and details of any amendments done.",
        parameters: ["contract"],
        exportPDF: true,
        exportXLSX: false,
      },
    ],
  },
  {
    value: "divisional_project_reports",
    label: "Divisional Project Reports",
    types: [
      {
        value: "Tab_35_rpt_PA_StatusPortfolioRollup",
        label: "Project Status Roll-Up",
        description:
          "Grouped on Portfolio, Shows Project #, Project Name, Project Manager, Start and End date for project, Status Date, Project Phase, Issues and decisions, Forecasts and Next steps and Project Health.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_34_rpt_PA_StatusDashboard",
        label: "Project Dashboard",
        description:
          "Grouped on Portfolio, Shows Project #, Project Name, Project Manager, Start and End date for project, Status Date, Project Phase and Project Health Color Indicators.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_19_rpt_PA_ActiveProjectsbyPortfolio",
        label: "Active Projects",
        description:
          "Project #, Project Name, Project Manager, Description, Project Type, Start and End Date, Planned Budget and Client Ministry.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_25_rpt_PA_LessonsLearnedbyCategory",
        label: "Projects Lessons Learned",
        description:
          "Grouped by Portfolio, sorted by Lesson Category. Project #, Name, Lesson Category, Sub Category, Lesson Learned and Recommendations.",
        parameters: ["portfolio", "fiscal", "project"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "rpt_PA_Ministry",
        label: "Ministry Project Usage",
        description:
          "Portfolio, Project #, Project Name, Project Description, Start Date, End Date, Project Budget, Client Sponsor and Project Manager.",
        parameters: ["portfolio", "fiscal"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "rpt_PA_Registered",
        label: "Projects Registered by Date / Period",
        description:
          "Breakdown shows the distribution between the portfolios and shows, Project #, project name, description, Project Manager, Registration Date, Start Date, End Date and Planned Budget.",
        parameters: ["date", "portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "rpt_PA_Fiscal_Registry",
        label: "Projects Registered by Fiscal",
        description:
          "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows Project #, Project Name, PM, Start and End Date, Planned Budget and client ministry",
        parameters: ["fiscal"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "change_request_types",
        label: "Change Request Types",
        description:
          "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows total change requests for the project even if changes occurred in a previous fiscal",
        parameters: ["fiscal"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "rpt_PA_ChangeRequestTypesFYSummary",
        label: "Multi-Year statistics for Project change requests",
        description:
          "Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter and portfolio recovery amount.",
        parameters: [],
        exportPDF: true,
        exportXLSX: false,
      },
    ],
  },
  {
    value: "divisional_project_financials",
    label: "Divisional Project Financials",
    types: [
      {
        value: "Tab_20_rpt_PA_Billed",
        label: "Projects Billed",
        description:
          "Project Name, Breakdown for each Quarter and Total Recoveries to date for fiscal.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_21_rpt_PA_Billing-Historical",
        label: "Historical Recoveries",
        description:
          "Grouped on fiscal, shows Project #, Project Name, Amount recovered each quarter and total recoveries.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_22_rpt_PA_ChangeRequestTypesFY-Summary",
        label: "Change requests Types",
        description:
          "Run for a specific fiscal and sorted by Project #. Shows total change requests for the project even if changes occurred in a previous fiscal.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_23_rpt_PA_Fiscal_Registry",
        label: "Projects Registered by Fiscal",
        description:
          "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows Project #, Project Name, PM, Start and End Date, Planned Budget and client ministry.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_27_rpt_PA_Ministry",
        label: "Ministry Project Usage",
        description:
          "Portfolio, Project #, Project Name, Project Description, Start Date, End Date, Project Budget, Client Sponsor, Project Manager.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_28_rpt_PA_MultiYrStats",
        label: "Multi YearAnnual Project Stats",
        description:
          "Annual stats report on projects in fiscal, total project budgets, total recovered, average duration, # of change requests, internal/external/social media # of unique clients.",
        parameters: ["portfolio"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_29_rpt_PA_MultiYrStatsChangeRequest",
        label: "Muli-year statistics for Project Change requests",
        description:
          "FY – Total Change Requests, Initiated by, Type of Change Request (Budget, Schedule, Scope).",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_30_rpt_PA_MultiYrStats_DMS_Office",
        label: "Annual Stats for the DMS",
        description:
          "Annual stats report on DMS office staff, salaries, division FTEs, DMS operating costs, target recoveries.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_31_rpt_PA_ProjectswithContracts",
        label: "Contracts for Projects",
        description:
          "Shows contract #s, Amendment #, Supplier, End Date of Contract, Contract Amount, Invoiced to Date, Balance Remaining.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_32_rpt_PA_Registered",
        label: "Projects Registered by Date/Period",
        description:
          "Breakdown shows the distribution between the portfolios and shows, project #, project name, description, Project Manager, Registration Date, Start Date, End Date and Planned budget.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_36_rpt_PF_BudgetbySTOB",
        label: "Budget by Stob",
        description:
          "Project#, Project Name, Recoverable status, Project total budget, Current Year Non-Recoverable Amounts, Current Fiscal Recoveries, Current Year Recovered to Date, Current Year Contract Fees, Current Year Staff Fees, Current Year Staff Travel, Other Stobs.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_37_rpt_PF_BudgetDistributionbyPortfolio",
        label: "Budget Distributions by Portfolio",
        description:
          "Based on fiscal year. Total Budget, Recoverable Amt, Non-Recoverable Amt, Total Contracts, Breakdown for portfolios current fiscal.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_38_rpt_PF_JVsforFiscal-Quarter",
        label: "Project JVs Processed",
        description:
          "Fiscal Year and Quarter, Project #, Project Name, JV Number, Date Billed, Amount.",
        parameters: ["fiscal", "quarter"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_39_rpt_PF_PortfolioForecastAll",
        label: "Project Forecasting by Quarter",
        description:
          "Grouped on Portfolio shows project #, Project Name, Quarter and fiscal amounts.",
        parameters: ["portfolio"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_40_rpt_PF_PortfolioAdminFees",
        label: "Project Recoveries Admin Fees for Fiscal",
        description:
          "Grouped on Portfolio shows project #, Project Name, fiscal amounts for a specific fiscal",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_41_rpt_PF_PortfolioStaffRecoveries",
        label: "Projects Project Staff Recoveries Forecast by Area",
        description:
          "Grouped on Portfolio shows project #, Project Name, Quarter and fiscal amounts.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_42_rpt_PF_PortfolioStobRecoveries",
        label: "Project Recovery Forecast by STOB",
        description:
          "Project#, Project Name, Recoverable Amt Current Fiscal, STOB breakdown for each of the following showing Amt and Recovered to date figures: 6398, 8807, 8809, 5798, 6598, Other.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_43_rpt_PF_RecoveryForecast",
        label: "Project Recovery Forecast",
        description:
          "Sorted by Project #, Shows project #, Project Name, Project Status, Recoverable Status and Amount for Each Quarter.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_44_rpt_PF_RecoveryToDateDetails",
        label: "Project Recoveries to Date Details",
        description:
          "Project Number, Project Name, Total Project Budget, Current Year Contracts, Current Year Recoveries to Date, Balance Remaining.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_48_rpt_PF_FinanceRecoverySummary",
        label: "Finance Recovery Project Summary Forecast",
        description:
          "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows Financial details for each project (per portfolio), including recoveries, expenses, costs, and fees.",
        parameters: ["fiscal"],
        exportPDF: true,
        exportXLSX: true,
      },
      {
        value: "Tab_49_rpt_PF_NetRecoveries",
        label: "GDX Project Net Recoveries",
        description:
          "Project name and number, total recoveries, total expenses, net recoveries, recovered to date, remaining recoveries.",
        parameters: ["portfolio", "fiscal"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_50_rpt_PF_NetRecoverySummaryByQuarter",
        label: "Net Recovery Summary By Quarter",
        description:
          "Run for a specific fiscal, grouped by Portfolio. Shows both Net and Gross recoveries per portfolio, and includes quarterly recoveries as well as fiscal year totals for expenses.",
        parameters: ["fiscal"],
        exportPDF: true,
        exportXLSX: true,
      },
      {
        value: "Tab_51_rpt_PF_ADIExport",
        label: "ADI Export",
        description:
          "Project CAScoding for both recovery ministry and GDX in the format required for input- can be run by quarter or project for all projects √ for processing.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_53_rpt_PF_FinProjectForecast-NEW",
        label: "Finance Project Forecast",
        description:
          "Project name and number, total recoveries for fiscal, total expenses for each stob type.",
        parameters: ["portfolio"],
        exportPDF: true,
        exportXLSX: false,
      },
    ],
  },
  {
    value: "divisional_contract_financials",
    label: "Divisional Contract Financials",
    types: [
      {
        value: "Tab_9_rpt_CA_MultiYrStats",
        label: "Annual Contract Multi Yr Stats",
        description:
          "Annual stats report on all Contracts showing number of contracts, total contracted amount, average duration, # of amendments, # with amendments, # of resources.",
        parameters: [],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_12_rpt_CF_InvoicePaymentsbyPortfolio",
        label: "Invoice Payments by Portfolio",
        description:
          "Grouped on Portfolio, Shows contract #, Start/End Date, Project Association, Contract Status, Fee Amt, Expense Amt, Invoices processed by month, total value remaining.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_13_rpt_CF_PortfolioSummary",
        label: "Contract Portfolio Summary",
        description: "ipsum lorem",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
    ],
  },
];
