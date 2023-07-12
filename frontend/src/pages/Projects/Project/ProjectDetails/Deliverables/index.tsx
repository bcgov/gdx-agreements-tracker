import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { FormConfig } from "./FormConfig";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";

import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
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
