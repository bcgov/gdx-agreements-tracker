import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useFormData } from "hooks/useFormData";
import { tableConfig } from "./tableConfig";
import { formConfig } from "./formConfig";
import { useFormControls } from "hooks";
import { IFormControls } from "types";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `ChangeRequest` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

export const InvoiceDeliverables = ({ invoiceId }: { invoiceId: number }) => {
  const tableName = `invoice_detail`;

  const tableData = useFormatTableData({
    apiEndPoint: `invoices/${invoiceId}/deliverables`,
    tableName,
  });
  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/invoices/deliverables/${formControls.currentRowData?.id}`,
    tableName,
  });

  return (
    <TableWithModal
      tableName={tableName}
      tableConfig={tableConfig()}
      tableData={tableData}
      formControls={formControls}
      formConfig={formConfig}
      formData={formData}
    />
  );
};
