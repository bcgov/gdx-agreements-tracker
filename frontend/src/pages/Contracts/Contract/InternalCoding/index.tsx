import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `ContractResources` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

export const InternalCoding = () => {
  const { contractId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <>
      <TableWithModal
        tableName={"sid_internal_coding"}
        tableConfig={tableConfig()}
        formControls={formControls}
        formConfig={FormConfig}
        tableDataApiEndPoint={`/contracts/${contractId}/internal-coding`}
        formDataApiEndpoint={`/contracts/internal-coding/${formControls.currentRowData?.id}`}
      />
    </>
  );
};
