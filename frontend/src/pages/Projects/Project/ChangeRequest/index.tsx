// import React from "react";
// import { useParams } from "react-router-dom";
// import { editFields, readFields } from "./fields";
// import { TableComplete } from "components/TableComplete";

// /**
//  * @returns the jsx for the change request section of the project form
//  */

// export const ChangeRequest = () => {
//   const { projectId } = useParams();
//   const roles = {
//     get: "projects_read_all",
//     add: "projects_add_one",
//     update: "projects_update_one",
//     delete: "projects_delete_one",
//   };

//   const url = {
//     getAll: `projects/${projectId}/change_request`,
//     getOne: `projects/${projectId}/change_request/{id}`,
//     updateOne: `change_request/{id}`,
//     addOne: `/change_request`,
//     deleteOne: `change_request/{id}`,
//   };

//   const columnWidths = {
//     summary: 3,
//     types: 2,
//   };



//   return (
//     <>
//       <TableComplete
//         itemName="Change Request"
//         tableName="lessons-learned"
//         columnWidths={columnWidths}
//         url={url}
//         createFormInitialValues={createFormInitialValues}
//         readFields={readFields}
//         editFields={editFields}
//         roles={roles}
//       />
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

export const ChangeRequest = () => {
  const { projectId } = useParams();

  const tableData = useFormatTableData(`projects/${projectId}/change_request`);
  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/${projectId}/change_request/${formControls.currentRowData?.id}`,
    tableName: "change_request",
  });
  console.log('formData', formData)

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

