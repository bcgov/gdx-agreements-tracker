import { FormRenderer } from "components/Forms/FormRenderer";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { IFormControls } from "types";
import { useFormControls } from "hooks";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const CloseOut = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Close Out");
  }, [updateTitle]);

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
