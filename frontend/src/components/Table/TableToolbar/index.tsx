import { Box, Button, Paper } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AuthorizationMessageBox } from "components/AuthorizationMessageBox";

export const TableToolBar = ({
  handleTableNewButton,
  canEdit,
}: {
  handleTableNewButton: () => void;
  canEdit: boolean;
}) => {
  return (
    <GridToolbarContainer>
      <Button
        startIcon={<AddBoxIcon />}
        onClick={() => {
          handleTableNewButton();
        }}
        disabled={canEdit}
      >
        Add New
      </Button>
      {canEdit && <AuthorizationMessageBox message={"You are not authorized to edit."} />}
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
