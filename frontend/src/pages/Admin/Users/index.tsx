import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const Users = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Users");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"users"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/sso/users`}
      formDataApiEndpoint={`/users/${formControls.currentRowData?.id}`}
    />
  );
};
