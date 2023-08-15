import { FormRenderer } from "components/Forms/FormRenderer";
import { useParams } from "react-router";
import FormConfig from "./FormConfig";
import { useFormControls } from "hooks";
import { IFormControls } from "types";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ProjectRegistrationSection` component is being returned.
 */

export const ContactsSection = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <FormRenderer
      formControls={formControls}
      tableName={"contact_project"}
      formConfig={FormConfig}
      formDataApiEndpoint={`/projects/${projectId}/contacts`}
    />
  );
};
