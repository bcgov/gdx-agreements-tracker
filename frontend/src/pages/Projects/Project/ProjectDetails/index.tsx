import { useKeycloak } from "@react-keycloak/web";
import { useAxios } from "hooks/useAxios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GDXAccordion } from "../../../../components/GDXAccordion";
import { AgreementSection } from "./AgreementSection";
import { BudgetSection } from "./BudgetSection";
import { ClientCodingSection } from "./ClientCodingSection";
import { ContactsSection } from "./ContactsSection";
import { DeliverablesSection } from "./Deliverables";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

/* This code exports a functional component called `ProjectDetails` that renders a series of
`GDXAccordion` components, each containing a different section of information related to a project. */
export const ProjectDetails = () => {
  const { axiosAll } = useAxios();
  const { projectId } = useParams();
  const { keycloak } = useKeycloak();

  const getProject = async () => {
    const project = await axiosAll().get(`projects/${projectId}`, {
      headers: {
        locked_row_id: projectId as string,
        locked_table: "project",
        locked_by: keycloak?.idTokenParsed?.email,
      },
    });
    project.data.table = "project";
    return project.data;
  };

  const projectQuery = useQuery(`project - ${projectId}`, getProject, {
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
      {"new" !== projectId && (
        <>
          <GDXAccordion sectionTitle="Agreement">
            <AgreementSection query={projectQuery} />
          </GDXAccordion>
          <GDXAccordion sectionTitle="Contacts">
            <ContactsSection projectId={Number(projectId)} />
          </GDXAccordion>
          <GDXAccordion sectionTitle="Deliverables">
            <DeliverablesSection projectId={Number(projectId)} />
          </GDXAccordion>
          <GDXAccordion sectionTitle="Client Coding">
            <ClientCodingSection projectId={Number(projectId)} />
          </GDXAccordion>
          <GDXAccordion sectionTitle="Budget">
            <BudgetSection projectId={Number(projectId)} />
          </GDXAccordion>
        </>
      )}
    </>
  );
};
