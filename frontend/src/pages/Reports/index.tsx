import { FC, useState } from "react";
import { Box, Grid, styled, Button, LinearProgress, FormControl, Typography } from "@mui/material";
import { ReportSelect } from "../../components";
import { Outlet, Link } from "react-router-dom";
import { IData } from "../../types";
import axios from "axios";
let reportUri = "report/projects/532/ProjectStatusReport";

const onExportButtonClick = () => {
  const url = `https://localhost:8080/${reportUri}`;
  axios(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      responseType: "arraybuffer",
    },
    responseType: "blob",
  })
    .then((response) => {
      const fileURL = window.URL.createObjectURL(response.data);
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = "SamplePDF.pdf"; // Need dynamic names
      alink.click();
      console.log("RESPONSE: ");
    })
    .catch((err) => {
      console.log(err);
    });
};

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "75vh",
  width: "100%",
});

export const Reports: FC = () => {
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
      <StyledBox>
        <FormControl>
          <Grid container spacing={2}>
            <Grid item>
              <ReportSelect />
            </Grid>
          </Grid>
        </FormControl>
      </StyledBox>
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
