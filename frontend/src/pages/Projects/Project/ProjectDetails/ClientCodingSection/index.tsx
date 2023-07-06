import { TableWithModal } from "components/PLAYGROUND/TableWithModal";

import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const ClientCodingSection = () => {
  const { projectId } = useParams();

  const tableName = "client_coding";

  const tableData = useFormatTableData({
    apiEndPoint: `projects/${projectId}/client-coding`,
    tableName,
  });

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/client-coding/${formControls.currentRowData?.id}`,
    tableName,
  });

  return (
    <TableWithModal
      tableName={tableName}
      tableConfig={tableConfig()}
      tableData={tableData}
      formControls={formControls}
      formConfig={FormConfig}
      formData={formData}
    />
  );
};
