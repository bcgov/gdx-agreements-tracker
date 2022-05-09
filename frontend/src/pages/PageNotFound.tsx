import React from "react";
import { Outlet } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <>
      <h2>404 not found</h2>
      <Outlet />
    </>
  );
};

export default PageNotFound;
