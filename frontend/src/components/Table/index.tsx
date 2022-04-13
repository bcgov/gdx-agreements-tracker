import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading: boolean;
}

export const Table = ({ columns, rows, loading }: TableProps) => {

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
    />
  );
};
