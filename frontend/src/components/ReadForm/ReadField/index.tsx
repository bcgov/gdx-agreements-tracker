import styled from "@emotion/styled";
import { Checkbox, Paper } from "@mui/material";
import React from "react";
import { IReturnValue } from "types";
import { GridItem } from "../../GDXForm/FormLayout/GridItem";

export const ReadField = ({
  width,
  title,
  value,
}: {
  width: string;
  title: string;
  value: IReturnValue;
}) => {
  const renderer = () => {
    switch (typeof value) {
      case "boolean":
        return (
          <>
            <h3>{title}</h3>
            <Checkbox disabled checked={value} />
          </>
        );
      default:
        return (
          <>
            <h3>{title}</h3>
            <p>{Array.isArray(value) ? value.join(" | ") : value}</p>
          </>
        );
    }
  };

  const StyledPaper = styled(Paper)({
    height: "auto",
    flex: 1,
    display: "flex",
    overflow: "auto",
  });

  return (
    <GridItem width={width}>
      <StyledPaper>{renderer()}</StyledPaper>
    </GridItem>
  );
};
