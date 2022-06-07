import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { GDX_Accordion } from "../../../components/GDX_Accordion";
import { ProjectLayout } from "../../../components/ProjectLayout";
import { apiAxios } from "../../../utils";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

export const Project = () => {
  const { projectId } = useParams();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project;
  };

  // Queries
  const projectQuery = useQuery(`project - ${projectId}`, getProject);

  return (
    <>
      {true === projectQuery.isLoading ? (
        <div>Loading</div>
      ) : (
        <GDX_Accordion sectionTitle="Project Registration">
          <ProjectRegistrationSection query={projectQuery} />
        </GDX_Accordion>
      )}

      <Outlet />
    </>
  );
};
