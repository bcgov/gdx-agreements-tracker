import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import bcgovTheme from "../../../bcgovTheme";

const StyledFooter = styled(Box)({
  borderTop: bcgovTheme.customSettings.BCGovAccentLine,
  padding: "8px 24px",
  marginTop: "auto",
});

export const PageFooter = () => (
  <StyledFooter role="page-footer" component="footer" bgcolor="primary.main" color="primary.contrastText">
    <Typography noWrap>Footer</Typography>
  </StyledFooter>
);
