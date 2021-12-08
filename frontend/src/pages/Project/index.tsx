import React from "react";
import { useParams, Outlet } from "react-router-dom";

export const Project = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const List = () => {
  return (
    <>
      <h2>Project List</h2>
    </>
  );
};

export const Details = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>Project Details {projectId}</h2>
    </>
  );
};

export const Status = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>Project Status {projectId} </h2>
    </>
  );
};

export const ChangeRequest = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>Change Request {projectId}</h2>
    </>
  );
};

export const Billing = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>Billing {projectId}</h2>
    </>
  );
};

export const LessonsLearned = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>Lessons Learned {projectId}</h2>
    </>
  );
};

export const CloseOut = () => {
  let { projectId } = useParams();
  return (
    <>
      <h2>Close Out {projectId}</h2>
    </>
  );
};
