import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const ProjectAgreementTypeOptions = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Agreement Types Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_agreement_types_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/project_agreement_types_option`}
      formDataApiEndpoint={`/project_agreement_types_option/${formControls.currentRowData?.id}`}
    />
  );
};
