import { FC, useEffect } from "react";
import { Box, Grid, styled, FormControl, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import ReportSelector from "components/ReportSelector";
import useTitle from "hooks/useTitle";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "75vh",
  width: "100%",
});

export const Reports: FC = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Reports");
  }, [updateTitle]);

  return (
    <>
      <Typography>
        Select the required <b>Category</b> followed by the <b>Type</b> of report, then fill in the
        required <b>Details</b> for the report. A description of the selected report will be shown
        under <b>Description</b>.
      </Typography>
      <StyledBox>
        <FormControl>
          <Grid container spacing={2}>
            <Grid item>
              <ReportSelector />
            </Grid>
          </Grid>
        </FormControl>
      </StyledBox>
      <Outlet />
    </>
  );
};
