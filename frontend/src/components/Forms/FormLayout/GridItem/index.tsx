import { Grid } from "@mui/material";

export const GridItem = ({ width, children }: { width: string; children: JSX.Element }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={"full" === width ? 12 : 6}>
        {children}
      </Grid>
    </>
  );
};
