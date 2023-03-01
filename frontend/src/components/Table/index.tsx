import React from "react";
import { DataGrid, GridEventListener, GridEvents } from "@mui/x-data-grid";
import { Box, styled } from "@mui/material";
import { ITable } from "../../types";
import { TableComponents } from "components/Table/TableComponents";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  maxHeight: "80vh",
  width: "100%",
});

export const Table = ({
  columns,
  rows,
  totalColumns,
  initialState,
  loading,
  onRowClick,
  allowEdit,
}: ITable) => {
  return (
    <StyledBox>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={loading}
        disableExtendRowFullWidth={true}
        sx={(theme) => ({
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: allowEdit ? theme.palette.primary.main : "#606060",
            color: theme.palette.primary.contrastText,
          },
          "& .MuiDataGrid-columnHeaders .MuiSvgIcon-root": {
            fill: theme.palette.primary.contrastText,
          },
          "& .MuiDataGrid-menuIconButton": {
            color: theme.palette.primary.contrastText,
          },
        })}
        onRowClick={onRowClick as GridEventListener<GridEvents.rowClick>}
        components={TableComponents(totalColumns, rows, columns)}
        initialState={initialState}
      />
    </StyledBox>
  );
};
