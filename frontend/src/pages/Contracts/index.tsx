import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

export const Contracts = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Contract List</h2>
        <Outlet />
      </Main>
    </>
  );
};
