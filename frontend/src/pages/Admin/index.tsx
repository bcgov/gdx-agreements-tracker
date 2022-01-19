import React, { FC } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Debug from "../../components/Debug";

export const Admin: FC = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Admin</h2>
        <Outlet />
      </Main>
    </>
  );
};

export const AdminDebug: FC = () => {
  return <Debug />;
};
