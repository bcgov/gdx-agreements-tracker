import React, { FC, ReactElement } from "react";
import { Box, Grid, styled, Button, LinearProgress, FormControl, FormLabel, Select, Typography } from "@mui/material";
import { ReportSelect } from "../../components";
import { Outlet, Link } from "react-router-dom";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "75vh",
  width: "100%",
});

//const data:{isLoading:boolean, reportCategories:{name:string, formLabel:string, defaultValue:string, parentId:string}} = {
const data:any = {
  isLoading: false,
  reportCategory: {
    name: "report_category",
    formLabel: "Category:",
    defaultValue: "individual_project_reports",
    options:[
      {
        parent:"",
        value: "individual_project_reports",
        label: "Individual Project Reports",
      },
      {
        parent:"",
        value: "individual_contract_reports",
        label: "Individual Contract Reports",
      },
      {
        parent:"",
        value: "divisional_project_reports",
        label: "Divisional Project Reports",
      },
      {
        parent:"",
        value: "divisional_project_financials",
        label: "Divisional Project Financials",
      },
      {
        parent:"",
        value: "divisional_contract_financials",
        label: "Divisional Contract Financials",
      },
    ],
  },
  reportType: {
    name: "report_type",
    formLabel: "Type:",
    defaultValue: "project_status_most_recent",
    options:[
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
        label: "Project Budget Summary"
      },
      {
        parent: "individual_project_reports",
        value: "project_quarterly_review",
        label: "Project Quarterly Review"
      },
      {
        parent: "individual_project_reports",
        value: "project_quarterly_billing_request",
        label: "Project Quarterly Billing Request"
      },
      {
        parent: "individual_contract_reports",
        value: "contract_summary",
        label: "Contract Summary"
      },
      {
        parent: "divisional_project_reports",
        value: "project_status_roll_up",
        label: "Project Status Roll-up"
      },
      {
        parent: "divisional_project_reports",
        value: "project_dashboard",
        label: "Project Dashboard"
      },
      {
        parent: "divisional_project_reports",
        value: "active_projects",
        label: "Active Projects"
      },
      {
        parent: "divisional_project_reports",
        value: "project_lessons_learned",
        label: "Project Lessons Learned"
      },
      {
        parent: "divisional_project_reports",
        value: "ministry_project_usage",
        label: "Ministry Project Usage"
      },
      {
        parent: "divisional_project_reports",
        value: "projects_registered_by_date_period",
        label: "Projects Registered by Date/Period"
      },
      {
        parent: "divisional_project_reports",
        value: "projects_registered_by_fiscal",
        label: "Projects Registered by Fiscal"
      },
      {
        parent: "divisional_project_reports",
        value: "change_request_types",
        label: "Change Request Types"
      },
      {
        parent: "divisional_project_reports",
        value: "multi_year_statistics_for_project_change_requests",
        label: "Multi-Year Statistics for Project Change Requests"
      },
    ],
  },
  reportParameters: {
    name: "report_parameters",
    formLabel: "Parameters:",
    defaultValue: "",
    components: [
      {
        parent:"project_status_most_recent",
        id:"project_number_select",
        label:"Project #",
        options: [
          {
            value:458,
            label:"458"
          }
        ],
      }
    ],
  },
  reportDescription: {
    name: "report_description",
    formLabel: "Description:",
    options: [
      {
        parent: "project_status_most_recent",
        id:0,
        value: "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status and milestone status."
      },
      {
        parent: "project_status_summary",
        id:1,
        value: "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, all status reporting, deliverable status and milestone status and Closure Report."
      },
      {
        parent: "project_budget_summary",
        id:2,
        value: "Runs by Project #, shows deliverable amounts, their budgets, amounts recovered to date, balance remaining. Shows breakdown across fiscals, any change requests, any contracts associated with the project and amounts invoiced/remaining on the contracts."
      },
      {
        parent: "project_quarterly_review",
        id:3,
        value: "Project Information, Budget Forecasting Information broken down between deliverable, detail amounts, quarter and portfolio recovery amount."
      },
      {
        parent: "project_quarterly_billing_request",
        id:4,
        value: "Runs on Project #, fiscal yr, quarter. Shows client billing information, summaries the breakdown charged per deliverable for the specific quarter/fiscal."
      },
      {
        parent: "contract_summary",
        id:5,
        value: "Summary report for an individualContract outlines initial setup, internal CAS Coding information, Invoices Process, Contract Payment Summary and details of any amendments done."
      },
    ]
  }
}

export const Reports: FC = () => {
  const switchRender = () => {
    switch (data.isLoading) {
      case true:
        return <LinearProgress />

      case false:
        return <StyledBox>
          <FormControl>
            <Grid container spacing={2}>
              <Grid item>
                <ReportSelect data={data} />
              </Grid>
            </Grid>
          </FormControl>
        </StyledBox>

      default:
        return <LinearProgress />
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Reports
      </Typography>
      <Typography>
        Select the required <b>Category</b> followed by the <b>Type</b> of report, then fill in the required <b>Details</b> for the report. A description of the selected report will be shown under <b>Description</b>.
      </Typography>
      {switchRender()}
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button component={Link} to={"/reports/preview"} variant="contained">
          Preview
        </Button>
        <Button component={Link} to={"/reports/export-pdf"} variant="contained">
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
