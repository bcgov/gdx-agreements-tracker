import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const Signout = () => {
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
      <Typography variant="h6">200</Typography>
      <StyledLine />
      <Typography variant="h6">
        You have been logged out successfully, you may now close this window.
      </Typography>
      <Outlet />
    </StyledDiv>
  );
};

export default Signout;
