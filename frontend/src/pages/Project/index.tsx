import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";
export const List = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Project List</h2>
        <Outlet />
      </Main>
    </>
  );
};

export const Details = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>The project details of {projectId}</h2>
      <Outlet />
    </>
  );
};

export const Status = () => {
  let { projectId } = useParams();
  return <h2>Status of {projectId}</h2>;
};

export const ChangeRequest = () => {
  let { projectId } = useParams();
  return <h2>Change request {projectId}</h2>;
};

export const Billing = () => {
  let { projectId } = useParams();
  return <h2>Billing for {projectId}</h2>;
};

export const LessonsLearned = () => {
  let { projectId } = useParams();
  return <h2>Lessons learned {projectId}</h2>;
};

export const CloseOut = () => {
  let { projectId } = useParams();
  return <h2>Close out {projectId}</h2>;
};
