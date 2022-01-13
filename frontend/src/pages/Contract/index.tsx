import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

export const List = () => {
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

export const Details = () => {
  let { contractId } = useParams();
  return (
    <>
      <h2>Contract Details {contractId}</h2>
      <Outlet />
    </>
  );
};
