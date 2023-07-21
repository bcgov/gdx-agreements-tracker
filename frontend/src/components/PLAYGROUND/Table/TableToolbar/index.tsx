import { Box, Button, Paper, TextField } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const TableToolBar = (handleTableNewButton: () => void) => {
  return (
    <GridToolbarContainer>
      <Button
        startIcon={<AddBoxIcon />}
        onClick={() => {
          handleTableNewButton();
        }}
      >
        Add New
      </Button>
      <Box sx={{ flex: "0%" }}></Box>
      <Paper elevation={3}> <GridToolbarQuickFilter sx={{ width:"500px", padding:"10px", border:"solid 1px #c5c5c5"}}/></Paper>
    </GridToolbarContainer>
  );
};
