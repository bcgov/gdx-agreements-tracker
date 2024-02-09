import { Box, Paper } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";

export const ReadTableToolbar = () => {
  return (
    <GridToolbarContainer>
      <Box sx={{ flex: "0%" }}></Box>
      <Paper elevation={3}>
        {" "}
        <GridToolbarQuickFilter
          sx={{ width: "500px", padding: "10px", border: "solid 1px #c5c5c5" }}
        />
      </Paper>
    </GridToolbarContainer>
  );
};
