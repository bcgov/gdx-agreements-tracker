import React, { FC, useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Debug from "../../components/Debug";

export const Admin: FC = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export const AdminDebug: FC = () => {
  return <Debug />;
}

export const Contacts: FC = () => {
  let { id } = useParams();
  return <h2>Contacts {id}</h2>;
};

export const Suppliers: FC = () => {
  let { id } = useParams();
  return <h2>Suppliers {id}</h2>;
};

export const SubContractors: FC = () => {
  let { id } = useParams();
  return <h2>Subcontractors {id}</h2>;
};

export const Resources: FC = () => {
  let { id } = useParams();
  return <h2>Resources {id}</h2>;
};

export const Ministries: FC = () => {
  let { id } = useParams();
  return <h2>Ministries {id}</h2>;
};
