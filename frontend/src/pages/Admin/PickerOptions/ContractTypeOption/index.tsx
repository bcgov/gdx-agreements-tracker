import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const ContractTypeOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Contract Type Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"contract_type_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/contract_type_option`}
      formDataApiEndpoint={`/contract_type_option/${formControls.currentRowData?.id}`}
    />
  );
};
