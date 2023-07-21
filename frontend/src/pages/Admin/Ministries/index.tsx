import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const Ministries = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Ministries");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"ministry"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/ministries`}
      formDataApiEndpoint={`/ministries/${formControls.currentRowData?.id}`}
    />
  );
};
