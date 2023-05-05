import { Grid, Paper, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

/**
 * Displays totals of column values in table footer.
 *
 * @param   {any}                                param0         Component props.
 * @param   {Array<{id: string; total: number}>} param0.totals  Array of column ids and totals.
 * @param   {Array<GridColDef>}                  param0.columns Array of columns.
 * @returns {JSXElement}
 */

type FooterColumns = { hide: any; field: React.Key | null | undefined; headerName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }
interface ITableTotalFooter {
  totals: Array<{ id: string; total: number }>;
  columns: FooterColumns[]
}

export const TableTotalFooter = ({
  totals,
  columns,
}: ITableTotalFooter) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Grid container spacing={1}>
        {columns.map((column: FooterColumns) => {
          if (column.hide) {
            return;
          }
          let value = "";
          const total = totals.find((t) => t.id === column.field);
          if (total) {
            value = total.total.toString();
          } else if ("edit" === column.field) {
            value = "Total";
          }
          return (
            <Grid item key={column.field} xs>
              {value !== "Total" && value !== "" && (
                <TextField
                  disabled
                  variant="standard"
                  label={column.headerName}
                  defaultValue={value}
                />
              )}
              {"Total" === value && <Typography variant="h6">Total</Typography>}
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
