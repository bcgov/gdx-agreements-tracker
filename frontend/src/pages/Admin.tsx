import React from "react";

import { Main } from "../components";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <Main>
        <h1>Admin</h1>
        <Outlet />
      </Main>
    </>
  );
};

export default Admin;
