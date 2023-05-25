// import React, { useState } from "react";
// import { Grid } from "@mui/material";
// import { TableComplete } from "components/TableComplete";
// import { useParams } from "react-router-dom";
// import { editFields, initialValues, readFields } from "./fields";
// import { InvoiceResources } from "./InvoiceResources";
// import { InvoiceDeliverables } from "./InvoiceDeliverables";

// export const InvoiceProcessing = () => {
//   const { contractId } = useParams();
//   const [invoiceId, setInvoiceId] = useState(0);

//   const roles = {
//     get: "contracts_read_all",
//     add: "contracts_add_one",
//     update: "contracts_update_one",
//     delete: "contracts_delete_one",
//   };

//   const url = {
//     getAll: `contracts/${contractId}/invoices`,
//     getOne: `invoices/{id}`,
//     updateOne: `invoices/{id}`,
//     addOne: `contracts/${contractId}/invoices`,
//     deleteOne: `invoices/{id}`,
//   };

//   return (
//     <>
//       <TableComplete
//         itemName="Invoices"
//         tableName="invoice"
//         url={url}
//         createFormInitialValues={initialValues}
//         readFields={readFields}
//         editFields={editFields}
//         totalColumns={["invoice_total"]}
//         roles={roles}
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         getSelectedRow={(row: any) => {
//           setInvoiceId(row.id);
//         }}
//       />
//       {invoiceId > 0 && (
//         <Grid container spacing={2}>
//           <Grid item md={6} sm={12}>
//             <InvoiceResources invoiceId={invoiceId} contractId={Number(contractId)} />
//           </Grid>
//           <Grid item md={6} sm={12}>
//             <InvoiceDeliverables invoiceId={invoiceId} contractId={Number(contractId)} />
//           </Grid>
//         </Grid>
//       )}
//     </>
//   );
// };


import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { formConfig } from "./formConfig";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `InvoiceProcessing` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

export const InvoiceProcessing = () => {
  const { contractId } = useParams();

  const tableName = "invoice";

  const tableData = useFormatTableData({
    apiEndPoint: `/contracts/${contractId}/invoices`,
    tableName,
  });

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/invoices/${formControls.currentRowData?.id}`,
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
