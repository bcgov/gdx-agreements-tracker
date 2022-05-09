import React from "react";
import { useParams } from "react-router-dom";
import { DetailsList } from "../../../components";
import { Outlet } from "react-router-dom";

export const Project = () => {
  const { projectId } = useParams();

  return (
    <>
      <DetailsList id={projectId} title={"project"} />
      <Outlet />
    </>
  );
};
