import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { GDX_Accordion } from "../../../components/GDX_Accordion";
import { apiAxios } from "../../../utils";
import { AgreementSection } from "./AgreementSection";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

/**
 * This reusable component renders the projects component
 *
 * @param   {object}             query React query that contains all projects
 * @returns {React.ReactElement}       The project component
 */

export const Project = () => {
  const { projectId } = useParams();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project;
  };

  // Queries
  const projectQuery = useQuery(`project - ${projectId}`, getProject, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      {true === projectQuery.isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <GDX_Accordion sectionTitle="Project Registration">
            <ProjectRegistrationSection query={projectQuery} />
          </GDX_Accordion>
          <GDX_Accordion sectionTitle="Agreement">
            <AgreementSection query={projectQuery} />
          </GDX_Accordion>
        </>
      )}

      <Outlet />
    </>
  );
};
