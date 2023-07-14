import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { IFormControls } from "types";
import { useFormControls } from "hooks";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ContractDetails` component is being returned.
 */

export const ContractDetails = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Contract Details");
  }, [updateTitle]);

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
