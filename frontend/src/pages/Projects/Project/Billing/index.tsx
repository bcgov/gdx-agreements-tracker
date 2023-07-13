import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const Billing = () => {
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
