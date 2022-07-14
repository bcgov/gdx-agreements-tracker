import { Grid, Paper, styled } from "@mui/material";
import React from "react";

export const GridItem = ({ width, children }: { width: string; children: JSX.Element }) => {
  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={width === "full" ? 12 : 6}
        lg={width === "full" ? 12 : 6}
      >
        {children}
      </Grid>
    </>
  );
};
