import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const ProjectFundingOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Funding Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_funding_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/project_funding_option`}
      formDataApiEndpoint={`/project_funding_option/${formControls.currentRowData?.id}`}
    />
  );
};
