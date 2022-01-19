import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";
export const List = () => {
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

export const Details = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>The project details of {projectId}</h2>
      <Outlet />
    </>
  );
};
