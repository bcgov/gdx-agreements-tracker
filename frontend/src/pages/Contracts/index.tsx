import React from "react";
import { Outlet } from "react-router-dom";
import { Main } from "../../components";

export const Contracts = () => {
  return (
    <>
      <Main>
        <h2>Contracts List</h2>
        <Outlet />
      </Main>
    </>
  );
};
