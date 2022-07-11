import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import React from "react";

const StyledViewFieldPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

export const ViewField = ({ children }: { children: JSX.Element }) => {
  return <StyledViewFieldPaper>{children}</StyledViewFieldPaper>;
};
