import { TableWithModal } from "components/TableWithModal";
import { FormConfig } from "./FormConfig";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";

export const DeliverablesSection = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_deliverable"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`projects/${projectId}/deliverables`}
      formDataApiEndpoint={`/projects/deliverables/${formControls.currentRowData?.id}`}
    />
  );
};
