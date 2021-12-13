import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

export const Admin = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export const User = () => {
  let { userId } = useParams();
  return <h2>User {userId}</h2>;
};

export const Contacts = () => {
  let { id } = useParams();
  return <h2>Contacts {id}</h2>;
};

export const Suppliers = () => {
  let { id } = useParams();
  return <h2>Suppliers {id}</h2>;
};

export const SubContractors = () => {
  let { id } = useParams();
  return <h2>Subcontractors {id}</h2>;
};

export const Resources = () => {
  let { id } = useParams();
  return <h2>Resources {id}</h2>;
};

export const Ministries = () => {
  let { id } = useParams();
  return <h2>Ministries {id}</h2>;
};
