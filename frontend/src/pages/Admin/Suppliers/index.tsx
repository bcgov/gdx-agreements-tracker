import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const Suppliers = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Suppliers");
  }, [updateTitle]);

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
