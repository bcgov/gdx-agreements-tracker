import React from "react";
import { Box } from "@mui/material";
import { GridColDef, GridToolbarQuickFilter, GridRowsProp } from "@mui/x-data-grid";
import { TableTotalFooter } from "./TotalFooter";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 *
 * @param   {string[] | undefined}                               totalColumns totalColumns to show totals for money columns.
 * @param   {GridRowsProp}                                       rows         rows used in datagrid.
 * @param   {GridColDef[]}                                       columns      columns used in datagrid.
 * @returns { Toolbar: quickSearchToolbar, Footer: tableFooter }              an object with that contains custom components for the table
 */

export const TableComponents = (
  totalColumns: string[] | undefined,
  rows: GridRowsProp,
  columns: {
    hide: boolean;
    field: React.Key | null | undefined;
    headerName:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  }[]
) => {
  const totals: Array<{ id: string; total: number }> = [];
  if (totalColumns && rows.length > 0) {
    totalColumns.forEach((col: string) => {
      totals.push({
        id: col,
        total: rows
          .map((x: { [x: string]: number }) => x[col])
          .reduce((prev: number, curr: number) => Number(prev) + Number(curr)),
      });
    });
  }

  const tableFooter = () => {
    if (totalColumns && totalColumns.length > 0 && rows.length > 0) {
      return <TableTotalFooter totals={totals} columns={columns} />;
    } else {
      return null;
    }
  };

  const quickSearchToolbar = () => {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  };

  return { Toolbar: quickSearchToolbar, Footer: tableFooter };
};
