import { FC, useState } from "react";
import { Box, Grid, styled, Button, LinearProgress, FormControl, Typography } from "@mui/material";
import { ReportSelect } from "../../components";
import { Outlet, Link } from "react-router-dom";
import { IData } from "../../types";
import axios from "axios";

let reportUri = "report/projects/532/ProjectStatusReport";

const onExportButtonClick = () => {
  const url = `https://localhost:8080/${reportUri}`;
  axios(url,
    {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'responseType': 'arraybuffer' },
      responseType: 'blob',
    })
    .then(response => {
        const fileURL = window.URL.createObjectURL(response.data);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'SamplePDF.pdf'; // Need dynamic names
        alink.click();
        console.log("RESPONSE: ");
    })
    .catch((err)=>{
      console.log(err)
    });
};

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "75vh",
  width: "100%",
});

const data: IData = {
  isLoading: false,
  reportCategory: {
    name: "report_category",
    formLabel: "Category:",
    defaultValue: "individual_project_reports",
    options: [
      {
        parent: null,
        value: "individual_project_reports",
        label: "Individual Project Reports",
      },
      {
        parent: null,
        value: "individual_contract_reports",
        label: "Individual Contract Reports",
      },
      {
        parent: null,
        value: "divisional_project_reports",
        label: "Divisional Project Reports",
      },
      {
        parent: null,
        value: "divisional_project_financials",
        label: "Divisional Project Financials",
      },
      {
        parent: null,
        value: "divisional_contract_financials",
        label: "Divisional Contract Financials",
      },
    ],
  },
  reportType: {
    name: "report_type",
    formLabel: "Type:",
    defaultValue: "project_status_most_recent",
    options: [
      {
        parent: "individual_project_reports",
        value: "project_status_most_recent",
        label: "Project Status (Most Recent)",
      },
      {
        parent: "individual_project_reports",
        value: "project_status_summary",
        label: "Project Status Summary",
      },
      {
        parent: "individual_project_reports",
        value: "project_budget_summary",
        label: "Project Budget Summary",
      },
      {
        parent: "individual_project_reports",
        value: "project_quarterly_review",
        label: "Project Quarterly Review",
      },
      {
        parent: "individual_project_reports",
        value: "project_quarterly_billing_request",
        label: "Project Quarterly Billing Request",
      },
      {
        parent: "individual_contract_reports",
        value: "contract_summary",
        label: "Contract Summary",
      },
      {
        parent: "divisional_project_reports",
        value: "project_status_roll_up",
        label: "Project Status Roll-up",
      },
      {
        parent: "divisional_project_reports",
        value: "project_dashboard",
        label: "Project Dashboard",
      },
      {
        parent: "divisional_project_reports",
        value: "active_projects",
        label: "Active Projects",
      },
      {
        parent: "divisional_project_reports",
        value: "project_lessons_learned",
        label: "Project Lessons Learned",
      },
      {
        parent: "divisional_project_reports",
        value: "ministry_project_usage",
        label: "Ministry Project Usage",
      },
      {
        parent: "divisional_project_reports",
        value: "projects_registered_by_date_period",
        label: "Projects Registered by Date/Period",
      },
      {
        parent: "divisional_project_reports",
        value: "projects_registered_by_fiscal",
        label: "Projects Registered by Fiscal",
      },
      {
        parent: "divisional_project_reports",
        value: "change_request_types",
        label: "Change Request Types",
      },
      {
        parent: "divisional_project_reports",
        value: "multi_year_statistics_for_project_change_requests",
        label: "Multi-Year Statistics for Project Change Requests",
      },
    ],
  },
  reportParameters: {
    name: "report_parameters",
    formLabel: "Parameters:",
    components: [
      {
        id: "date_select",
        label: "Date",
        input: "date",
        defaultValue: "",
        parents: ["projects_registered_by_date_period"],
        options: [],
      },
      {
        id: "fiscal_year_select",
        label: "Fiscal year",
        input: "select",
        defaultValue: "20-21",
        parents: [
          "project_quarterly_billing_request",
          "project_lessons_learned",
          "ministry_project_usage",
          "projects_registered_by_fiscal",
          "change_request_types",
        ],
        options: [
          {
            value: "20-21",
            label: "20-21",
          },
          {
            value: "19-20",
            label: "19-20",
          },
          {
            value: "18-19",
            label: "18-19",
          },
          {
            value: "17-18",
            label: "17-18",
          },
          {
            value: "16-17",
            label: "16-17",
          },
          {
            value: "15-16",
            label: "15-16",
          },
        ],
      },
      {
        id: "quarter_select",
        label: "Quarter",
        input: "select",
        defaultValue: "Q1",
        parents: ["project_quarterly_billing_request"],
        options: [
          {
            value: "Q1",
            label: "Q1",
          },
          {
            value: "Q2",
            label: "Q2",
          },
          {
            value: "Q3",
            label: "Q3",
          },
          {
            value: "Q4",
            label: "Q4",
          },
        ],
      },
      {
        id: "project_number_select",
        label: "Project #",
        input: "select",
        defaultValue: "458",
        parents: [
          "project_status_most_recent",
          "project_status_summary",
          "project_budget_summary",
          "project_quarterly_review",
          "project_quarterly_billing_request",
        ],
        options: [
          {
            value: "458",
            label: "458",
          },
        ],
      },
      {
        id: "contract_number_select",
        label: "Contract #",
        input: "select",
        defaultValue: "CO-408CMTEST",
        parents: ["contract_summary"],
        options: [
          {
            value: "CO-408CMTEST",
            label: "CO-408CMTEST",
          },
          {
            value: "C22TST_EL",
            label: "C22TST_EL",
          },
          {
            value: "CGDX-CMtest1",
            label: "CGDX-CMtest1",
          },
        ],
      },
      {
        id: "portfolio_select",
        label: "Portfolio:",
        input: "checkbox",
        defaultValue: "ANA",
        parents: [
          "project_status_roll_up",
          "project_dashboard",
          "active_projects",
          "project_lessons_learned",
          "ministry_project_usage",
          "projects_registered_by_date_period",
        ],
        options: [
          {
            value: "ANA",
            label: "ANA",
          },
          {
            value: "BCS",
            label: "BCS",
          },
          {
            value: "CE",
            label: "CE",
          },
          {
            value: "DES",
            label: "DES",
          },
          {
            value: "DMS",
            label: "DMS",
          },
          {
            value: "DP",
            label: "DP",
          },
        ],
      },
    ],
  },
  reportDescription: {
    name: "report_description",
    formLabel: "Description:",
    options: [
      {
        id: 0,
        value:
          "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status and milestone status.",
        parent: "project_status_most_recent",
      },
      {
        id: 1,
        value:
          "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, all status reporting, deliverable status and milestone status and Closure Report.",
        parent: "project_status_summary",
      },
      {
        id: 2,
        value:
          "Runs by Project #, shows deliverable amounts, their budgets, amounts recovered to date, balance remaining. Shows breakdown across fiscals, any change requests, any contracts associated with the project and amounts invoiced/remaining on the contracts.",

        parent: "project_budget_summary",
      },
      {
        id: 3,
        value:
          "Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter and portfolio recovery amount.",
        parent: "project_quarterly_review",
      },
      {
        id: 4,
        value:
          "Runs on Project #, fiscal yr, quarter. Shows client billing information, summaries the breakdown charged per deliverable for the specific quarter/fiscal.",
        parent: "project_quarterly_billing_request",
      },
      {
        id: 5,
        value:
          "Summary report for an individualContract outlines initial setup, internal CAS Coding information, Invoices Process, Contract Payment Summary and details of any amendments done.",
        parent: "contract_summary",
      },
      {
        id: 6,
        value:
          "Grouped on Portfolio, Shows Project #, Project Name, Project Manager, Start and End date for project, Status Date, Project Phase, Issues and decisions, Forecasts and Next steps and Project Health.",
        parent: "project_status_roll_up",
      },
      {
        id: 7,
        value:
          "Grouped on Portfolio, Shows Project #, Project Name, Project Manager, Start and End date for project, Status Date, Project Phase and Project Health Color Indicators.",
        parent: "project_dashboard",
      },
      {
        id: 8,
        value:
          "Project #, Project Name, Project Manager, Description, Project Type, Start and End Date, Planned Budget and Client Ministry.",
        parent: "active_projects",
      },
      {
        id: 9,
        value:
          "Grouped by Portfolio, sorted by Lesson Category. Project #, Name, Lesson Category, Sub Category, Lesson Learnaed and Recommendations.",
        parent: "project_lessons_learned",
      },
      {
        id: 10,
        value:
          "Portfolio, Project #, Project Name, Project Description, Start Date, End Date, Project Budget, Client Sponsor and Project Manager.",
        parent: "ministry_project_usage",
      },
      {
        id: 11,
        value:
          "Breakdown shows the distribution between the portfolios and shows, Project #, project name, description, Project Manager, Registaration Date, Start Date, End Date and Planned Budget.",
        parent: "projects_registered_by_date_period",
      },
      {
        id: 12,
        value:
          "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows Project #, Project Name, PM, Start and End Date, Planned Budget and client ministry",
        parent: "projects_registered_by_fiscal",
      },
      {
        id: 13,
        value:
          "Run for a specific fiscal, grouped by Portfolio and sorted by Project #. Shows total change requests for the project even if changes occurred in a previous fiscal",
        parent: "change_request_types",
      },
      {
        id: 14,
        value:
          "Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter and portfolio recovery amount.",
        parent: "multi_year_statistics_for_project_change_requests",
      },
    ],
  },
};

export const Reports: FC = () => {
  // Should be moved to reportselect
  const [ reportParams, updateParams ] = useState({ reportId:null, fiscal:null, quarter:null });
  const handleUpdateParams = (event: any) => {
    updateParams(event.currentTarget.value);
  }

  const switchRender = () => {
    switch (data.isLoading) {
      case true:
        return <LinearProgress />;

      case false:
        return (
          <StyledBox>
            <FormControl>
              <Grid container spacing={2}>
                <Grid item>
                  <ReportSelect data={data} />
                </Grid>
              </Grid>
            </FormControl>
          </StyledBox>
        );

      default:
        return <LinearProgress />;
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Reports
      </Typography>
      <Typography>
        Select the required <b>Category</b> followed by the <b>Type</b> of report, then fill in the
        required <b>Details</b> for the report. A description of the selected report will be shown
        under <b>Description</b>.
      </Typography>
      {switchRender()}
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button component={Link} to={"/reports/preview"} variant="contained">
          Preview
        </Button>
        <Button onClick={onExportButtonClick} variant="contained">
          Export PDF
        </Button>
        <Button component={Link} to={"/reports/export-xls"} variant="contained">
          Export XLS
        </Button>
      </Box>
      <Outlet />
    </>
  );
};
