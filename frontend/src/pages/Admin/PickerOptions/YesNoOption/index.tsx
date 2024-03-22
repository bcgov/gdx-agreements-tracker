import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const YesNoOptions = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Yes No Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"yes_no_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/yes_no_option`}
      formDataApiEndpoint={`/yes_no_option/${formControls.currentRowData?.id}`}
    />
  );
};
