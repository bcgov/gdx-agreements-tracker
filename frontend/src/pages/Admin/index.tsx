import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

export const Admin = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Admin</h2>
      </Main>
    </>
  );
};

export const User = () => {
  let { userId } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <h2>User {userId}</h2>
      </Main>
    </>
  );
};

export const Contacts = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Contacts {id}</h2>
      </Main>
    </>
  );
};

export const Suppliers = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Suppliers {id}</h2>
      </Main>
    </>
  );
};

export const SubContractors = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Subcontractors {id}</h2>
      </Main>
    </>
  );
};

export const Resources = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Resources {id}</h2>
      </Main>
    </>
  );
};

export const Ministries = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Ministries {id}</h2>
      </Main>
    </>
  );
};
