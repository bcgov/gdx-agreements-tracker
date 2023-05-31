// import React from "react";
// import { Grid } from "@mui/material";
// import { editFields, readFields, createFormInitialValues } from "./fields";
// import { TableComplete } from "components/TableComplete";
// import { useParams } from "react-router-dom";

// export const Deliverables = () => {
//   const { contractId } = useParams();

//   const roles = {
//     get: "contracts_read_all",
//     add: "contracts_add_one",
//     update: "contracts_update_one",
//     delete: "contracts_delete_one",
//   };

//   const url = {
//     getAll: `contracts/${contractId}/deliverables`,
//     getOne: `contracts/deliverables/{id}`,
//     updateOne: `contracts/deliverables/{id}`,
//     addOne: `contracts/${contractId}/deliverables`,
//     deleteOne: `contracts/deliverables/{id}`,
//   };

//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={12}>
//           <TableComplete
//             itemName="Deliverables"
//             tableName="contract"
//             url={url}
//             createFormInitialValues={createFormInitialValues}
//             readFields={readFields}
//             editFields={editFields}
//             roles={roles}
//           />
//         </Grid>
//       </Grid>
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
 * @returns The `ContractResources` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

export const Deliverables = () => {
  const { contractId } = useParams();

  const tableName = "contract_deliverable";

  const tableData = useFormatTableData({
    apiEndPoint: `/contracts/${contractId}/deliverables`,
    tableName,
  });

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/contracts/deliverables/${formControls.currentRowData?.id}`,
    tableName,
  });

  return (
    <>
      <TableWithModal
        tableName={tableName}
        tableConfig={tableConfig()}
        tableData={tableData}
        formControls={formControls}
        formConfig={formConfig}
        formData={formData}
      />
    </>
  );
};
