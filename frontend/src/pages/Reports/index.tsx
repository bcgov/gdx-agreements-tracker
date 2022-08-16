import React, { FC, ReactElement } from "react";
import { Box, Grid, styled, Button, LinearProgress, FormControl, FormLabel, Select, Typography } from "@mui/material";
import { RadioSelect } from "../../components";
import { Outlet, Link } from "react-router-dom";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "50vh",
  width: "100%",
});

//const data:{isLoading:boolean, reportCategories:{name:string, formLabel:string, defaultValue:string, parentId:string}} = {
const data:any = {
  isLoading: false,
  reportCategories: {
    name: "report_category",
    formLabel: "Category:",
    defaultValue: "individual_project_reports",
    parentId: "none",
    options:[
      {
        parent: "",
        value: "individual_project_reports",
        label: "Individual Project Reports",
      },
      {
      parent: "",
      value: "individual_contract_reports",
      label: "Individual Contract Reports",
      },
      {
        parent: "",
        value: "divisional_project_reports",
        label: "Divisional Project Reports",
      },
      {
        parent: "",
        value: "divisional_project_financials",
        label: "Divisional Project Financials",
      },
      {
        parent: "",
        value: "divisional_contract_financials",
        label: "Divisional Contract Financials",
      },
    ],
  },
  reportTypes: {
    name: "report_type",
    formLabel: "Type:",
    defaultValue: "project_status_most_recent",
    parentId: "report_category",
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
        parent: "individual_project_reports",
        value: "contract_summary",
        label: "Contract Summary"
      }
    ],
  },
}

function renderMaybe(data:any) {
  let selected = document.getElementById(data.parentId)?.getAttribute("selectedValue") || "nuffin";
  console.log(document.getElementById(data.parentId))
  return <RadioSelect formLabel="Category:" defaultValue={data.defaultValue} name={data.name} options={data.options} />
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
                {renderMaybe(data.reportCategories)}
              </Grid> 
              <Grid item>
                {renderMaybe(data.reportTypes)}
              </Grid>
              <Grid item>
                <FormLabel id="parameter-group">Parameters:</FormLabel>
                <Box border={2} borderRadius={1} padding={1}>
                  <Select>
                  </Select>
                </Box>
              </Grid>
              <Grid item>
                <FormLabel id="parameter-group">Description:</FormLabel>
                <Box border={2} borderRadius={1} padding={1}>
                </Box>
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
