import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const Subcontractors = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Subcontractors");
  }, [updateTitle]);

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
