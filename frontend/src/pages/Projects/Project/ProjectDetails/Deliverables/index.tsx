import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { formConfig } from "./formConfig";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";
import { tableConfig } from "./tableConfig";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";

export const DeliverablesSection = () => {
  const { projectId } = useParams();

  const tableData = useFormatTableData(`projects/${projectId}/deliverables`);

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/deliverables/${formControls.currentRowData?.id}`,
    tableName: "project_deliverable",
  });

  return (
    <TableWithModal
      tableConfig={tableConfig()}
      tableData={tableData}
      formControls={formControls}
      formConfig={formConfig}
      formData={formData}
    />
  );
};
