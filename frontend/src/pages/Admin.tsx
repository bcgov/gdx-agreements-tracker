import React from "react";

import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h1>Admin</h1>
        <Outlet />
      </Main>
    </>
  );
};

export default Admin;
