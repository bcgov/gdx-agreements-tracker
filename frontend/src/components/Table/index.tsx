import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { TableToolBar } from "./TableToolbar";
import { useRenderTableCell } from "hooks";
import keycloak from "keycloak";

export const Table = ({
  rows,
  tableConfig,
  handleRowDoubleClick,
  handleRowClick = null,
  handleTableNewButton,
  isReadOnly = !keycloak.tokenParsed.client_roles.includes("PMO-Admin-Edit-Capability"),
}: // todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const { tableColumns, initialState } = tableConfig;

  const DataGridStyles = {
    //Remove cell selection border
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    ".MuiDataGrid-columnHeader": {
      background: "#0a1d41",
    },
    ".MuiDataGrid-iconSeparator, .MuiDataGrid-sortIcon, .MuiDataGrid-columnHeader, .MuiDataGrid-menuIcon,.MuiDataGrid-filterIcon,.MuiDataGrid-menuIconButton":
      {
        color: "#fff",
      },
    //  padding for the auto-height row cells
    "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "0.5rem" },
    "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "0.9375rem" },
    "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": { py: "1.375rem" },
    flex: "1 0 auto",
  };

  const BoxStyles = { width: "100%" };

  return (
    <Box sx={BoxStyles}>
      {rows && (
        <DataGrid
          getRowHeight={() => "auto"}
          columns={tableColumns}
          rows={rows}
          initialState={initialState}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
          sx={DataGridStyles}
          slots={{
            toolbar: () => (
              <TableToolBar handleTableNewButton={handleTableNewButton} isReadOnly={isReadOnly} />
            ),
            cell: useRenderTableCell,
          }}
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
