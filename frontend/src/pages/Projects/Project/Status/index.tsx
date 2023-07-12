import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const Status = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_status"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`projects/${projectId}/status`}
      formDataApiEndpoint={`/projects/status/${formControls.currentRowData?.id}`}
    />
  );
};
