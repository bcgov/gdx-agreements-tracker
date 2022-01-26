import React from "react";
import { Outlet } from "react-router-dom";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

export const PageNotFound = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h2>404 not found</h2>
        <Outlet />
      </Main>
    </>
  );
};

export default PageNotFound;
