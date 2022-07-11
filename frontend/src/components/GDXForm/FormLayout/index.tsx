import { Grid, Paper, styled } from "@mui/material";
import { IFormLayout } from "../../../types";

export const FormLayout = ({ children }: IFormLayout) => {
  return (
    <Grid container spacing={4}>
      {children}
    </Grid>
  );
};
