import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { IFormControls } from "types";
import { useFormControls } from "hooks";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ContractDetails` component is being returned.
 */

export const ContractDetails = () => {
  const { contractId } = useParams();

  const formControls: IFormControls = useFormControls();
  return (
    <FormRenderer
      formControls={formControls}
      tableName={"contract"}
      formConfig={FormConfig}
      formDataApiEndpoint={`/contracts/${contractId}`}
    />
  );
};
