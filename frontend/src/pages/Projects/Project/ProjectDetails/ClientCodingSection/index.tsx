// import { TableComplete } from "components/TableComplete";
// import React from "react";
// import { readFields, editFields, initialValues } from "./fields";

// export const ClientCodingSection = ({ projectId }: { projectId: number }) => {
//   const roles = {
//     get: "projects_read_all",
//     add: "projects_add_one",
//     update: "projects_update_one",
//     delete: "projects_delete_one",
//   };

//   const url = {
//     getAll: `projects/${projectId}/client-coding`,
//     getOne: `projects/client-coding/{id}`,
//     updateOne: `projects/client-coding/{id}`,
//     addOne: `projects/${projectId}/client-coding`,
//     deleteOne: `projects/client-coding/{id}`,
//   };

//   const columnWidths = {
//     program_area: 2,
//     financial_contact: 2,
//     expense_authority_name: 2,
//     responsibility_centre: 2,
//   };

//   return (
//     <TableComplete
//       itemName={"Client Coding"}
//       tableName={"client-coding"}
//       url={url}
//       roles={roles}
//       editFields={editFields}
//       readFields={readFields}
//       columnWidths={columnWidths}
//       createFormInitialValues={initialValues}
//     />
//   );
// };


import { TableWithModal } from "components/PLAYGROUND/TableWithModal";

import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { formConfig } from "./formConfig"

export const ClientCodingSection = () => {
  const { projectId } = useParams();

  const tableData = useFormatTableData(`projects/${projectId}/client-coding`);

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/client-coding/${formControls.currentRowData?.id}`,
    tableName: "client_coding",
  });

  return (
    <TableWithModal
      tableConfig={tableConfig()}
      tableData={tableData}
      formControls={formControls}
      formConfig={formConfig}
      formData={formData}
    />
  );
};
