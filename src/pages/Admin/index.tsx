import React from "react";
import { useParams, Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <h2>Admin</h2>
      <Outlet />
    </>
  );
};

export const Login = () => {
  return (
    <>
      <h2>Login page</h2>
    </>
  );
};

export const User = () => {
  let { userId } = useParams();
  return (
    <>
      <h2>User {userId}</h2>
    </>
  );
};

export const Contacts = () => {
  let { id } = useParams();
  return (
    <>
      <h2>Contacts {id}</h2>
    </>
  );
};

export const Suppliers = () => {
  let { id } = useParams();
  return (
    <>
      <h2>Suppliers {id}</h2>
    </>
  );
};

export const SubContractors = () => {
  let { id } = useParams();
  return (
    <>
      <h2>Subcontractors {id}</h2>
    </>
  );
};

export const Resources = () => {
  let { id } = useParams();
  return (
    <>
      <h2>Resources {id}</h2>
    </>
  );
};

export const Ministries = () => {
  let { id } = useParams();
  return (
    <>
      <h2>Ministries {id}</h2>
    </>
  );
};
