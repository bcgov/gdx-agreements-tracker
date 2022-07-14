import React from "react";
import { DataGrid, GridEventListener, GridEvents } from "@mui/x-data-grid";
import { Box, styled } from "@mui/material";
import { ITable } from "../../types";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "50vh",
  width: "100%",
});

export const Table = ({ columns, rows, loading, onRowClick }: ITable) => {
  return (
    <StyledBox>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        disableExtendRowFullWidth={true}
        onRowClick={onRowClick as GridEventListener<GridEvents.rowClick>}
      />
    </StyledBox>
  );
};
