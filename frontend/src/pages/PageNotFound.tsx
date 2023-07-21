import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

export const PageNotFound = () => {
  const StyledLine = styled("div")(() => ({
    margin: "0 50px",
    height: "200px",
    borderLeft: "1px solid #999",
  }));

  const Test = styled("div")(() => ({
    display: "flex",
    justifyContent: "space-between",
    width: "30%",
    margin: "auto",
    height: "50%",
  }));

  return (
    <Test>
      <h2>404</h2>
      <StyledLine />
      <h3>Page Not Found</h3>
      <Outlet />
    </Test>
  );
};

export default PageNotFound;
