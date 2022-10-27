import React from "react";
import { DataGrid, GridEventListener, GridEvents } from "@mui/x-data-grid";
import { Box, styled } from "@mui/material";
import { ITable } from "../../types";
import { TableTotalFooter } from "components/Table/TableTotalFooter";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  maxHeight: "80vh",
  width: "100%",
});

export const Table = ({ columns, rows, totalColumns, loading, onRowClick, allowEdit }: ITable) => {
  const totals: Array<{ id: string; total: number }> = [];
  if (totalColumns && rows.length > 0) {
    totalColumns.forEach((col: string) => {
      totals.push({
        id: col,
        total: rows.map((x) => x[col]).reduce((prev, curr) => Number(prev) + Number(curr)),
      });
    });
  }

  /**
   * Determines which table footer to show, totals or pagination.
   *
   * @returns {any}
   */
  const tableComponents = () => {
    if (totalColumns && totalColumns.length > 0 && rows.length > 0) {
      return {
        Footer: () => {
          return <TableTotalFooter totals={totals} columns={columns} />;
        },
      };
    } else {
      return {};
    }
  };

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
          "& .MuiDataGrid-menuIconButton": {
            color: theme.palette.primary.contrastText,
          },
        })}
        onRowClick={onRowClick as GridEventListener<GridEvents.rowClick>}
        components={tableComponents()}
      />
    </StyledBox>
  );
};
