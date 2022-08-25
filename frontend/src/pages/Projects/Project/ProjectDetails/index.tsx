import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GDXAccordion } from "../../../../components/GDXAccordion";
import { apiAxios } from "../../../../utils";
import { AgreementSection } from "./AgreementSection";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

export const ProjectDetails = () => {
  const { projectId } = useParams();
  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project.data.data;
  };

  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectQuery: any = useQuery(`project - ${projectId}`, getProject, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      <GDXAccordion sectionTitle="Project Registration">
        <ProjectRegistrationSection query={projectQuery} />
      </GDXAccordion>
      <GDXAccordion sectionTitle="Agreement">
        <AgreementSection query={projectQuery} />
      </GDXAccordion>
    </>
  );
};
