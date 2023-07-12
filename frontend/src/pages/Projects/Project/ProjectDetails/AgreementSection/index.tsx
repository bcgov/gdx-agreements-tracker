import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { useFormControls } from "hooks";
import { IFormControls } from "types";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `AgreementSection` component is being returned.
 */

export const AgreementSection = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <FormRenderer
      formControls={formControls}
      tableName={"projects"}
      formConfig={FormConfig}
      formDataApiEndpoint={`/projects/${projectId}`}
    />
  );
};
