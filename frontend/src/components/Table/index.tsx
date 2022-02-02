import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
}

export const Table = ({ columns, rows }: TableProps) => {
  return <DataGrid rows={rows} columns={columns} />;
};
