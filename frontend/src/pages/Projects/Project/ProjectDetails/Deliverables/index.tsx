import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { formConfig } from "./formConfig";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";

export const DeliverablesSection = () => {
  const { projectId } = useParams();

  const tableName = "project_deliverable";

  const tableData = useFormatTableData({
    apiEndPoint: `projects/${projectId}/deliverables`,
    tableName,
  });

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/deliverables/${formControls.currentRowData?.id}`,
    tableName,
  });

  return (
    <TableWithModal
      tableName={tableName}
      tableConfig={tableConfig()}
      tableData={tableData}
      formControls={formControls}
      formConfig={formConfig}
      formData={formData}
    />
  );
};
