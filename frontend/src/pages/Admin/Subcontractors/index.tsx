import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const Subcontractors = () => {
  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"subcontractors"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/subcontractors`}
      formDataApiEndpoint={`/subcontractors/${formControls.currentRowData?.id}`}
    />
  );
};
