import { Grid, Paper, styled } from "@mui/material";
import React from "react";

export const GridItem = ({
  width,
  title,
  value,
}: {
  width: string;
  title: string;
  value: string;
}) => {
  const StyledPaper = styled(Paper)({
    height: "auto",
    flex: 1,
    display: "flex",
    overflow: "auto",
  });

  return (
    <>
      <Grid
        key={title}
        item
        xs={12}
        sm={12}
        md={width === "full" ? 12 : 6}
        lg={width === "full" ? 12 : 6}
      >
        <StyledPaper>
          <h3>{title}</h3>
          <p>{value}</p>
        </StyledPaper>
      </Grid>
    </>
  );
};
