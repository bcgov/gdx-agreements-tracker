import { useKeycloak } from "@react-keycloak/web";
import { useAxios } from "hooks/useAxios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GDXAccordion } from "../../../../components/GDXAccordion";
import { AgreementSection } from "./AgreementSection";
import { BudgetSection } from "./BudgetSection";
import { ClientCodingSection } from "./ClientCodingSection";
import { ContactsSection } from "./ContactsSection";
import { DeliverablesSection } from "./Deliverables";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

export const ProjectDetails = () => {
  const [userHasEditCapability, setEditCapability] = useState(false);

  const { axiosAll } = useAxios();

  const { projectId } = useParams();

  //Destructure the keycloak functionality
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
