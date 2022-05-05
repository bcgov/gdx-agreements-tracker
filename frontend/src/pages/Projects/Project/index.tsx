import React from "react";
import { useParams } from "react-router-dom";
import { DetailsList } from "../../../components";

export const Project = () => {
  const { projectId } = useParams();

  return (
    <>
      <DetailsList id={projectId} title={"project"} />
    </>
  );
};
