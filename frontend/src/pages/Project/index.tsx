import React from "react";
import { useParams } from "react-router-dom";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";

export const List = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h2>Project List</h2>
      </Main>
    </>
  );
};

export const Details = () => {
  let { projectId } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <p>The project details of {projectId}</p>
      </Main>
    </>
  );
};

export const Status = () => {
  let { projectId } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <p>Status of {projectId}</p>
      </Main>
    </>
  );
};

export const ChangeRequest = () => {
  let { projectId } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <p>Change request {projectId}</p>
      </Main>
    </>
  );
};

export const Billing = () => {
  let { projectId } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <p>Billing for {projectId}</p>
      </Main>
    </>
  );
};

export const LessonsLearned = () => {
  let { projectId } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <p>Lessons learned {projectId}</p>
      </Main>
    </>
  );
};

export const CloseOut = () => {
  let { projectId } = useParams();
  return (
    <>
      <Sidebar />
      <Main>
        <p>Close out {projectId}</p>
      </Main>
    </>
  );
};
