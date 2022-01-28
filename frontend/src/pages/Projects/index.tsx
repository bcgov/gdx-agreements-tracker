import React from "react";
import { Outlet } from "react-router-dom";
import { Main } from "../../components";

export const Projects = () => {
  return (
    <>
      <Main>
        <h2>Project List</h2>
        <Outlet />
      </Main>
    </>
  );
};
