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
  return (
    <>
      <GDXAccordion sectionTitle="Project Registration">
        <ProjectRegistrationSection />
      </GDXAccordion>
      <GDXAccordion sectionTitle="Agreement">
        <AgreementSection />
      </GDXAccordion>
      <GDXAccordion sectionTitle="Contacts">
        <ContactsSection />
      </GDXAccordion>
      <GDXAccordion sectionTitle="Deliverables">
        <DeliverablesSection />
      </GDXAccordion>
      <GDXAccordion sectionTitle="Client Coding">
        <ClientCodingSection />
      </GDXAccordion>
      <GDXAccordion sectionTitle="Budget">
        <BudgetSection />
      </GDXAccordion>
    </>)

};
