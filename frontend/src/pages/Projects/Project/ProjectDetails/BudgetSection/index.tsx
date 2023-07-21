import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const BudgetSection = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_budget"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`projects/${projectId}/budget`}
      formDataApiEndpoint={`/projects/budget/${formControls.currentRowData?.id}`}
    />
  );
};
