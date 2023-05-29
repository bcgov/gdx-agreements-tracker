// import { TableComplete } from "components/TableComplete";
// import React from "react";
// import { editFields, initialValues, readFields } from "./fields";
// import { GridRowId } from "@mui/x-data-grid";

// export const InvoiceResources = ({
//   invoiceId,
//   contractId,
// }: {
//   invoiceId: GridRowId | undefined;
//   contractId: number;
// }) => {
//   const roles = {
//     get: "contracts_read_all",
//     add: "contracts_add_one",
//     update: "contracts_update_one",
//     delete: "contracts_delete_one",
//   };

//   const url = {
//     getAll: `invoices/${invoiceId}/resources`,
//     getOne: `invoices/resources/{id}`,
//     updateOne: `invoices/resources/{id}`,
//     addOne: `invoices/${invoiceId}/resources`,
//     deleteOne: ``,
//   };

//   const columnWidths = {
//     resource_assignment: 3,
//     hours: 1,
//     rate: 1,
//     amount: 1,
//   };

//   return (
//     <TableComplete
//       itemName={"Resource"}
//       tableName={"resources"}
//       columnWidths={columnWidths}
//       url={url}
//       createFormInitialValues={initialValues}
//       readFields={readFields}
//       editFields={editFields(contractId)}
//       totalColumns={["hours", "rate", "amount"]}
//       roles={roles}
//     />
//     <div>{invoiceId}</div>
//   );
// };


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

export const InvoiceResources = ({ invoiceId }: any) => {

  const tableName = `invoice_detail`;

  const tableData = useFormatTableData({
    apiEndPoint: `invoices/${invoiceId}/resources`,
    tableName,
  });

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/invoices/resources/${formControls.currentRowData?.id}`,
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
