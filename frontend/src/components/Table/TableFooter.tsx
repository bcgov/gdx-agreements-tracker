import { Grid, Paper } from "@mui/material";
import React from "react";

const TableFooter = ({
  total,
  index1,
  columns,
}: {
  total: number;
  index1: number;
  columns: any;
}) => {
  return (
    <Grid container spacing={1}>
      {columns.map((column: any, index: any) => {
        if (index1 === index) {
          return (
            <Grid item xs={1}>
              {" "}
              <Paper>{total}</Paper>
            </Grid>
          );
        } else {
          return <Grid item xs={1}></Grid>;
        }
      })}
    </Grid>
  );
};

export default TableFooter;
