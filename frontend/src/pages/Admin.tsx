import React from "react";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <>
        <h1>Admin</h1>
        <Outlet />
      </>
    </>
  );
};

export default Admin;
