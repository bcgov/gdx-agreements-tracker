import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { formConfig } from "./formConfig";

export const BudgetSection = () => {
  const { projectId } = useParams();

  const tableData = useFormatTableData(`projects/${projectId}/budget`);

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/budget/${formControls.currentRowData?.id}`,
    tableName: "project_budget",
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
