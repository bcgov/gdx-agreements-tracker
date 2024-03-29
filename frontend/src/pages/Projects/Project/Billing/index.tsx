import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const Billing = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Billing");
  }, [updateTitle]);

  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"jv"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`projects/${projectId}/jv`}
      formDataApiEndpoint={`/jv/${formControls.currentRowData?.id}`}
    />
  );
};
