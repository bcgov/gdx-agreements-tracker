# Table Too Bar

The `TableToolBar` component provides a toolbar for a data grid table with common actions such as adding a new item and filtering the table.

## Props

- `handleTableNewButton`: A function to handle the action when the "Add New" button is clicked.

## Components

- `GridToolbarContainer`: A container component for the toolbar.
- `Button`: A Material-UI button component.
- `AddBoxIcon`: An icon component for the "Add New" button.
- `Box`: A layout component for spacing.
- `Paper`: A Material-UI paper component for styling.
- `GridToolbarQuickFilter`: A quick filter component for the data grid table.

## Usage

```jsx
import { Box, Button, Paper } from "@mui/material";
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
      <Paper elevation={3}>
        {" "}
        <GridToolbarQuickFilter
          sx={{ width: "500px", padding: "10px", border: "solid 1px #c5c5c5" }}
        />
      </Paper>
    </GridToolbarContainer>
  );
};
