import React from "react";
import { styled } from "@mui/material/styles";

export const Unauthorized = () => {
  const StyledLine = styled("div")(() => ({
    margin: "0 50px",
    height: "200px",
    borderLeft: "1px solid #999",
  }));

  const StyledDiv = styled("div")(() => ({
    display: "flex",
    justifyContent: "space-between",
    width: "30%",
    margin: "auto",
    height: "50%",
  }));

  return (
    <StyledDiv>
      <h2>401</h2>
      <StyledLine />
      <h3>You are unauthorized to view this page</h3>
    </StyledDiv>
  );
};

export default Unauthorized;
