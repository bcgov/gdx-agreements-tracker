/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataGrid, GridEventListener, GridEvents } from "@mui/x-data-grid";
import { Box, styled } from "@mui/material";
import { ITable } from "../../types";
import { TableTotalFooter } from "components/Table/TableTotalFooter";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "50vh",
  width: "100%",
});

export const Table = ({ columns, rows, totalColumns, loading, onRowClick }: ITable) => {
  const totals: Array<{ id: string; total: number }> = [];
  if (totalColumns) {
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
    if (totalColumns && totalColumns.length > 0) {
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
        rows={rows}
        columns={columns}
        loading={loading}
        disableExtendRowFullWidth={true}
        onRowClick={onRowClick as GridEventListener<GridEvents.rowClick>}
        components={tableComponents()}
      />
    </StyledBox>
  );
};
