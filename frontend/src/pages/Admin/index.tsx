import React from "react";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <>
        <h2>Admin</h2>
        <Outlet />
      </>
    </>
  );
};
