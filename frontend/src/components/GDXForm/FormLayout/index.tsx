import { Box, styled, Typography, useTheme } from "@mui/material";
import React from "react";
import { IFormLayout } from "../../../types";

export const FormLayout = ({ children }: IFormLayout) => {
  const theme = useTheme();

  const StyledSectionTitle = styled(Typography)({
    backgroundColor: "#f1f1f1",
    textIndent: "10px",
  });

  const StyledSectionContainer = styled("div")({
    border: "solid 3px #f1f1f1",
    borderRadius: "4px",
    padding: "10px",
  });

  const StyledBoxHolder = styled("div")({
    [theme.breakpoints.down("md")]: {
      columnCount: 1,
    },
    [theme.breakpoints.up("md")]: {
      columnCount: 2,
    },
  });

  return (
    <StyledSectionContainer>
      <StyledSectionTitle variant="h6">Form Registration</StyledSectionTitle>
      <StyledBoxHolder>{children}</StyledBoxHolder>
    </StyledSectionContainer>
  );
};
