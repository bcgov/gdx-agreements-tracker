import React from "react";
import { Outlet } from "react-router-dom";
import { Main } from "../components";

export const PageNotFound = () => {
  return (
    <Main>
      <h2>404 not found</h2>
      <Outlet />
    </Main>
  );
};

export default PageNotFound;
