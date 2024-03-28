import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const ProjectTypeOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Type Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_type_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/project_type_option`}
      formDataApiEndpoint={`/project_type_option/${formControls.currentRowData?.id}`}
    />
  );
};
