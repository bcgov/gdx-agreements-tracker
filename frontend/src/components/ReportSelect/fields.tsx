import { IReportParams } from "types";

const fieldTypes = {
  fiscal: {
    fieldName: "fiscal",
    fieldType: "select",
    fieldLabel: "Fiscal",
    width: "half",
    pickerName: "fiscal_year_option",
  },
  project: {
    fieldName: "project",
    fieldType: "select",
    fieldLabel: "Project #",
    width: "half",
    pickerName: "project_option",
  },
  quarter: {
    fieldName: "quarter",
    fieldType: "select",
    fieldLabel: "Quarter",
    width: "half",
    tableName: "generic",
  },
  portfolio: {
    fieldName: "portfolio",
    fieldType: "multiselect",
    fieldLabel: "Portfolio",
    width: "half",
    pickerName: "portfolio_option",
  },
  contract: {
    fieldName: "contract",
    fieldType: "select",
    fieldLabel: "Contract",
    width: "half",
    pickerName: "contract_option",
  },
  date: {
    fieldName: "date",
    fieldType: "date",
    fieldLabel: "Date",
    width: "half",
  },
};

export const requestTypes = {
  query: 1,
  route: 2,
};

export const reportCategory = {
  name: "report_category",
  formLabel: "Category",
  defaultOption: { label: "Individual Project Reports", value: "individual_project_reports" },
  options: [
    { label: "Individual Project Reports", value: "individual_project_reports" },
    {
      label: "Individual Contract Reports",
      value: "individual_contract_reports",
    },
    { label: "Divisional Project Reports", value: "divisional_project_reports" },
    {
      label: "Divisional Project Financials",
      value: "divisional_project_financials",
    },
    {
      label: "Divisional Contract Financials",
      value: "divisional_contract_financials",
    },
  ],
};

export const reportType = {
  name: "report_type",
  formLabel: "Type",
  defaultOption: { label: "Individual Project Reports", value: "individual_project_reports" },
  options: [
    {
      reportCategory: "individual_project_reports",
      value: "project-status-report",
      label: "Project Status (Most Recent)",
      reportParamCategory: [
        {
          field: fieldTypes.project,
          type: requestTypes.route,
          isRequired: true,
        },
      ],
    },
    {
      reportCategory: "individual_project_reports",
      value: "project-status-summary",
      label: "Project Status Summary",
      reportParamCategory: [
        {
          field: fieldTypes.project,
          type: requestTypes.route,
          isRequired: true,
        },
      ],
    },
    {
      reportCategory: "individual_project_reports",
      value: "budget-summary",
      label: "Project Budget Summary",
      reportParamCategory: [
        {
          field: fieldTypes.project,
          type: requestTypes.route,
          isRequired: true,
        },
      ],
    },
    {
      reportCategory: "individual_project_reports",
      value: "project-quarterly-review",
      label: "Project Quarterly Review",
      reportParamCategory: [
        {
          field: fieldTypes.project,
          type: requestTypes.route,
          isRequired: true,
        },
      ],
    },
    {
      reportCategory: "individual_project_reports",
      value: "project-quarterly-billing-request",
      label: "Project Quarterly Billing Request",
      reportParamCategory: [
        {
          field: fieldTypes.project,
          type: requestTypes.route,
          isRequired: true,
        },
        {
          field: fieldTypes.fiscal,
          type: requestTypes.query,
        },
        {
          field: fieldTypes.quarter,
          type: requestTypes.query,
        },
      ],
    },
    {
      reportCategory: "individual_contract_reports",
      value: "contract-summary",
      label: "Contract Summary",
      reportParamCategory: [
        {
          field: fieldTypes.contract,
          type: requestTypes.route,
          isRequired: true,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "Tab_35_rpt_PA_StatusPortfolioRollup",
      label: "Project Status Roll-up",
      reportParamCategory: [
        {
          field: fieldTypes.portfolio,
          type: requestTypes.query,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "Tab_34_rpt_PA_StatusDashboard",
      label: "Project Dashboard",
      reportParamCategory: [
        {
          field: fieldTypes.portfolio,
          type: requestTypes.query,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "Tab_19_rpt_PA_ActiveProjectsbyPortfolio",
      label: "Active Projects",
      reportParamCategory: [
        {
          field: fieldTypes.portfolio,
          type: requestTypes.query,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "Tab_25_rpt_PA_LessonsLearnedbyCategory",
      label: "Project Lessons Learned",
      reportParamCategory: [
        {
          field: fieldTypes.portfolio,
          type: requestTypes.query,
        },
        {
          field: fieldTypes.fiscal,
          type: requestTypes.query,
          isRequired: true,
        },
        {
          field: fieldTypes.project,
          type: requestTypes.query,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "rpt_PA_Ministry",
      label: "Ministry Project Usage",
      reportParamCategory: [
        {
          field: fieldTypes.portfolio,
          type: requestTypes.query,
        },
        {
          field: fieldTypes.fiscal,
          type: requestTypes.query,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "rpt_PA_Registered",
      label: "Projects Registered by Date/Period",
      reportParamCategory: [
        {
          field: fieldTypes.portfolio,
          type: requestTypes.query,
        },
        {
          field: fieldTypes.date,
          type: requestTypes.query,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "projects_registered_by_fiscal",
      label: "Projects Registered by Fiscal",
      reportParamCategory: [
        {
          field: fieldTypes.fiscal,
          type: requestTypes.route,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "change_request_types",
      label: "Change Request Types",
      reportParamCategory: [
        {
          field: fieldTypes.fiscal,
          type: requestTypes.route,
        },
      ],
    },
    {
      reportCategory: "divisional_project_reports",
      value: "multi_year_statistics_for_project_change_requests",
      label: "Multi-Year Statistics for Project Change Requests",
      reportParamCategory: [],
    },
  ],
};

export const reportDescription = {
  name: "report_description",
  formLabel: "Description",
  options: [
    {
      value:
        "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status and milestone status.",
      reportType: "ProjectStatusReport",
    },
    {
      value:
        "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, all status reporting, deliverable status and milestone status and Closure Report.",
      reportType: "project_status_summary",
    },
    {
      value:
        "Runs by Project #, shows deliverable amounts, their budgets, amounts recovered to date, balance remaining. Shows breakdown across fiscals, any change requests, any contracts associated with the project and amounts invoiced/remaining on the contracts.",

      reportType: "project_budget_summary",
    },
    {
      value:
        "Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter and portfolio recovery amount.",
      reportType: "project_quarterly_review",
    },
    {
      value:
        "Runs on Project #, fiscal yr, quarter. Shows client billing information, summaries the breakdown charged per deliverable for the specific quarter/fiscal.",
      reportType: "project_quarterly_billing_request",
    },
    {
      value:
        "Summary report for an individualContract outlines initial setup, internal CAS Coding information, Invoices Process, Contract Payment Summary and details of any amendments done.",
      reportType: "contract_summary",
    },
    {
      value:
        "Grouped on Portfolio, Shows Project #, Project Name, Project Manager, Start and End date for project, Status Date, Project Phase, Issues and decisions, Forecasts and Next steps and Project Health.",
      reportType: "project_status_roll_up",
    },
    {
      value:
        "Grouped on Portfolio, Shows Project #, Project Name, Project Manager, Start and End date for project, Status Date, Project Phase and Project Health Color Indicators.",
      reportType: "project_dashboard",
    },
    {
      value:
        "Project #, Project Name, Project Manager, Description, Project Type, Start and End Date, Planned Budget and Client Ministry.",
      reportType: "active_projects",
    },
    {
      value:
        "Grouped by Portfolio, sorted by Lesson Category. Project #, Name, Lesson Category, Sub Category, Lesson Learnaed and Recommendations.",
      reportType: "project_lessons_learned",
    },
    {
      value:
        "Portfolio, Project #, Project Name, Project Description, Start Date, End Date, Project Budget, Client Sponsor and Project Manager.",
      reportType: "ministry_project_usage",
    },
    {
      value:
        "Breakdown shows the distribution between the portfolios and shows, Project #, project name, description, Project Manager, Registaration Date, Start Date, End Date and Planned Budget.",
      reportType: "projects_registered_by_date_period",
    },
    {
      value:
        "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows Project #, Project Name, PM, Start and End Date, Planned Budget and client ministry",
      reportType: "projects_registered_by_fiscal",
    },
    {
      value:
        "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows total change requests for the project even if changes occurred in a previous fiscal",
      reportType: "change_request_types",
    },
    {
      value:
        "Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter and portfolio recovery amount.",
      reportType: "multi_year_statistics_for_project_change_requests",
    },
  ],
};

export const reportParameters: IReportParams = {
  name: "report_parameters",
  formLabel: "Parameters",
};
