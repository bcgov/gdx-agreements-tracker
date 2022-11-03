import { useAxios } from "hooks/useAxios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GDXAccordion } from "../../../../components/GDXAccordion";
import { AgreementSection } from "./AgreementSection";
import { ClientCodingSection } from "./ClientCodingSection";
import { ContactsSection } from "./ContactsSection";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

export const ProjectDetails = () => {
  const [userHasEditCapability, setEditCapability] = useState(false);

  const { axiosAll } = useAxios();

  const { projectId } = useParams();

  const getProject = async () => {
    const project = await axiosAll().get(`projects/${projectId}`);
    return project.data;
  };

  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectQuery: any = useQuery(`project - ${projectId}`, getProject, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    const user = projectQuery?.data?.user;
    setEditCapability(user && user.capabilities.includes("projects_update_one"));
  }, [projectQuery]);

  return (
    <>
      <GDXAccordion sectionTitle="Project Registration">
        <ProjectRegistrationSection
          query={projectQuery}
          userHasEditCapability={userHasEditCapability}
        />
      </GDXAccordion>
      {"new" !== projectId && (
        <>
          <GDXAccordion sectionTitle="Agreement">
            <AgreementSection query={projectQuery} userHasEditCapability={userHasEditCapability} />
          </GDXAccordion>
          <GDXAccordion sectionTitle="Contacts">
            <ContactsSection projectId={Number(projectId)} />
          </GDXAccordion>
          <GDXAccordion sectionTitle="Client Coding">
            <ClientCodingSection projectId={Number(projectId)} />
          </GDXAccordion>
        </>
      )}
    </>
  );
};
