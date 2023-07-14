import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const Suppliers = () => {
  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"suppliers"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/suppliers`}
      formDataApiEndpoint={`/suppliers/${formControls.currentRowData?.id}`}
    />
  );
};
