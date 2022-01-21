import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

export const Projects = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Project List</h2>
        <Outlet />
      </Main>
    </>
  );
};
