import React from "react";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";

const StyledViewFieldPaper = styled(Paper)(() => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

export const ViewField = ({ children }: { children: JSX.Element }) => {
  return <StyledViewFieldPaper>{children}</StyledViewFieldPaper>;
};
