import { Button } from "@mui/material";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const TableToolBar = (handleTableNewButton: () => void) => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <Button
        startIcon={<AddBoxIcon />}
        onClick={() => {
          handleTableNewButton();
        }}
      >
        Add New
      </Button>
    </GridToolbarContainer>
  );
};
