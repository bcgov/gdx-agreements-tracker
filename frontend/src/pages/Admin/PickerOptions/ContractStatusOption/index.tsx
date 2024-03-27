import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const ContractStatusOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Contract Status Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"contract_status_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/contract_status_option`}
      formDataApiEndpoint={`/contract_status_option/${formControls.currentRowData?.id}`}
    />
  );
};
