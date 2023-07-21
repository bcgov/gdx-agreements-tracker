import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const ClientCodingSection = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"client_coding"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`projects/${projectId}/client-coding`}
      formDataApiEndpoint={`/projects/client-coding/${formControls.currentRowData?.id}`}
    />
  );
};
