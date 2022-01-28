import React from "react";
import { Outlet } from "react-router-dom";
import { Main } from "../../components";

export const Admin = () => {
  return (
    <>
      <Main>
        <h2>Admin</h2>
        <Outlet />
      </Main>
    </>
  );
};
