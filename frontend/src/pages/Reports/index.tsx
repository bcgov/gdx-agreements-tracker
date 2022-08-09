import React, { FC, ReactElement } from "react";
import { Box, styled, Button, LinearProgress, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import { RadioSelect } from "../../components";
import { Outlet, Link } from "react-router-dom";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "50vh",
  width: "100%",
});

const radioButtons:{ value:string, label:string }[] = [
  {
    value:"individual-project-reports",
    label:"Individual Project Reports",

  },
  { 
    value:"individual-contract-reports",
    label:"Individual Contract Reports", 

  },
  { 
    value:"divisional-project-reports",
    label:"Divisional Project Reports",

  },
  {
    value:"divisional-project-financials",
    label:"Divisional Project Financials",

  },
  {
    value:"divisional-contract-financials",
    label:"Divisional Contract Financials",

  }];


export const Reports: FC = () => {
  <Typography variant="h5" component="h2">
        Reports
      </Typography>

  let isLoading = false;
  const switchRender = () => {
    switch (isLoading) {
      case true:
        return <LinearProgress />

      case false:
        return <StyledBox>
          <FormControl>
            <RadioSelect formLabel="Category" defaultValue="individual-project-reports" name="report-category" data={radioButtons} />
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
