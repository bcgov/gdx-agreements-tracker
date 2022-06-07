import { TextField } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ProjectLayout } from "../../../components/ProjectLayout";
import { apiAxios } from "../../../utils";

export const Project = () => {
  const { projectId } = useParams();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project;
  };

  // Queries
  const query = useQuery(`project - ${projectId}`, getProject);

  return (
    <>
      {true === query.isLoading ? (
        <div>Loading</div>
      ) : (
        <ProjectLayout>
          {Object.entries(query.data?.data).map(([key, value]) => {
            return (
              <div key={key}>
                <br />
                <TextField disabled label={key} defaultValue={value} />
                <br />
              </div>
            );
          })}
        </ProjectLayout>
      )}

      <Outlet />
    </>
  );
};
