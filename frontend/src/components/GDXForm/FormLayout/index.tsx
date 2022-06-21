import { styled, useTheme } from "@mui/material";
import React from "react";
import { IFormLayout } from "../../../types";

export const FormLayout = ({ children }: IFormLayout) => {
  const theme = useTheme();

  const StyledBoxHolder = styled("div")({
    [theme.breakpoints.down("md")]: {
      columnCount: 1,
    },
    [theme.breakpoints.up("md")]: {
      columnCount: 2,
    },
  });

  return (
    <>
      <StyledBoxHolder>{children}</StyledBoxHolder>
    </>
  );
};
