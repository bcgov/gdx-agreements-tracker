import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import React from "react";
import { GridItem } from "../GDXForm/FormLayout/GridItem";

export const ReadField = ({
  width,
  title,
  value,
}: {
  width: string;
  title: string;
  value: string | number;
}) => {
  const StyledPaper = styled(Paper)({
    height: "auto",
    flex: 1,
    display: "flex",
    overflow: "auto",
  });

  return (
    <GridItem width={width}>
      <StyledPaper>
        <h3>{title}</h3>
        <p>{value}</p>
      </StyledPaper>
    </GridItem>
  );
};
