import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { IProjectLayout } from "../../types";

const StyledSectionTitle = styled(Typography)({
  backgroundColor: "#f1f1f1",
  textIndent: "10px",
  margin:"-10px"
});

const StyledSectionContainer = styled(Box)({
  border: "solid 3px #f1f1f1",
  borderRadius: "4px",
  padding: "10px",
});

export const ProjectLayout = ({ children }: IProjectLayout) => {
  return (
    <StyledSectionContainer>
      <StyledSectionTitle variant="h6">Project Registration</StyledSectionTitle>
      {children}
    </StyledSectionContainer>
  );
};
