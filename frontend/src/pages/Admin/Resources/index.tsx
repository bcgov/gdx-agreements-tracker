
import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `Resources` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `FormConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

export const Resources = () => {

  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Resources");
  }, [updateTitle]);
  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"resource"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/resources`}
      formDataApiEndpoint={`/resources/${formControls.currentRowData?.id}`}
    />
  );
};
