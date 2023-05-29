import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = ({ rows, tableConfig, handleRowDoubleClick, handleRowClick = null }: any) => {
  const { tableColumns, initialState } = tableConfig;

  const DataGridStyles = {
    //Remove cell selection border
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    ".MuiDataGrid-columnHeader": {
      background: "#555",
    },
    ".MuiDataGrid-iconSeparator, .MuiDataGrid-sortIcon, .MuiDataGrid-columnHeader, .MuiDataGrid-menuIcon,.MuiDataGrid-filterIcon,.MuiDataGrid-menuIconButton":
      {
        color: "#fff",
      },
  };

  const BoxStyles = { height: "80vh", width: "100%" };

  return (
    <Box sx={BoxStyles}>
      {rows && (
        <DataGrid
          columns={tableColumns}
          rows={rows}
          initialState={initialState}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
          sx={DataGridStyles}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                variant: "outlined",
                size: "small",
              },
            },
          }}
        />
      )}
    </Box>
  );
};
