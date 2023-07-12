import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { IFormControls } from "types";
import { useFormControls } from "hooks";

export const CloseOut = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <FormRenderer
      formControls={formControls}
      tableName={"projects"}
      formConfig={FormConfig}
      formDataApiEndpoint={`/projects/${projectId}/close-out`}
    />
  );
};
