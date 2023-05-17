import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { formConfig } from "./formConfig";

export const Status = () => {
  const { projectId } = useParams();

  const tableData = useFormatTableData(`projects/${projectId}/status`);
  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/status/${formControls.currentRowData?.id}`,
    tableName: "project_status",
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
