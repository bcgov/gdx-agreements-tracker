import React from "react";
import { Outlet } from "react-router-dom";

export const Contracts = () => {
  return (
    <>
      <>
        <h2>Contracts List</h2>
        <Outlet />
      </>
    </>
  );
};
