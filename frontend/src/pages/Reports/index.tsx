import { FC } from "react";
import { Box, Grid, styled, FormControl, Typography } from "@mui/material";
import { ReportSelect } from "../../components";
import { Outlet } from "react-router-dom";
import ReportSelector from "components/PLAYGROUND/ReportSelector";

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
              {/* <ReportSelector/> */}
            </Grid>
          </Grid>
        </FormControl>
      </StyledBox>
      <Outlet />
    </>
  );
};
