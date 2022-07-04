import { LinearProgress } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GDX_Accordion } from "../../../../components/GDX_Accordion";
import { apiAxios } from "../../../../utils";
import { AgreementSection } from "./AgreementSection";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

export const ProjectDetails = () => {
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
      {(() => {
        switch (projectQuery.isLoading) {
          case true:
            return <LinearProgress />;

          case false:
            return (
              <>
                <GDX_Accordion sectionTitle="Project Registration">
                  <ProjectRegistrationSection query={projectQuery} />
                </GDX_Accordion>
                <GDX_Accordion sectionTitle="Agreement">
                  <AgreementSection query={projectQuery} />
                </GDX_Accordion>
              </>
            );
        }
      })()}
    </>
  );
};

// | QueryObserverIdleResult<AxiosResponse, unknown>
//     | QueryObserverLoadingErrorResult<AxiosResponse, unknown>
//     | QueryObserverRefetchErrorResult
//     | QueryObserverSuccessResult
//     | UseQueryResult<AxiosResponse, unknown>;
