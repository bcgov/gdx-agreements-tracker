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
          "Grouped by Portfolio, sorted by Lesson Category. Project #, Name, Lesson Category, Sub Category, Lesson Learnaed and Recommendations.",
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
          "Breakdown shows the distribution between the portfolios and shows, Project #, project name, description, Project Manager, Registaration Date, Start Date, End Date and Planned Budget.",
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
      {
        value: "Tab_48_rpt_PF_FinanceRecoverySummary",
        label: "Finance Recovery Project Summary Forecast",
        description:
          "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows Financial details for each project (per portfolio), including recoveries, expenses, costs, and fees.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
      {
        value: "Tab_49_rpt_PF_NetRecoveries",
        label: "GDX Project Net Recoveries",
        description:
          "Run for a specific fiscal, grouped by recovery area and sorted by Project #. Shows total recoveries, expenses, net recoveries, recovered-to-date and remaining recoveries for each project.",
        parameters: ["fiscal"],
        exportPDF: true,
        exportXLSX: false,
      },
      {
        value: "Tab_50_rpt_PF_NetRecoverySummaryByQuarter",
        label: "Net Recovery Summary By Quarter",
        description:
          "Run for a specific fiscal, grouped by Portfolio. Shows both Net and Gross recoveries per portfolio, and includes quarterly recoveries as well as fiscal year totals for expenses.",
        parameters: ["fiscal"],
        exportPDF: false,
        exportXLSX: true,
      },
    ],
  },
];
