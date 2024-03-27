import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const ProjectStatusOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Status Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_status_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/project_status_option`}
      formDataApiEndpoint={`/project_status_option/${formControls.currentRowData?.id}`}
    />
  );
};
