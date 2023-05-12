import { TableComplete } from "components/TableComplete";
import React, { useEffect } from "react";



// export const DeliverablesSection = ({ projectId }: { projectId: number }) => {
//   const roles = {
//     get: "projects_read_all",
//     add: "projects_add_one",
//     update: "projects_update_one",
//     delete: "projects_delete_one",
//   };

//   const url = {
//     getAll: `projects/${projectId}/deliverables`,
//     getOne: `projects/deliverables/{id}`,
//     updateOne: `projects/deliverables/{id}`,
//     addOne: `projects/deliverables`,
//   };

//   const columnWidths = {
//     program_area: 2,
//     financial_contact: 2,
//     expense_authority_name: 2,
//     responsibility_centre: 2,
//   };

//   return (
//     <TableComplete
//       itemName={"Deliverables"}
//       tableName={"deliverable"}
//       url={url}
//       roles={roles}
//       editFields={editFields}
//       readFields={readFields}
//       columnWidths={columnWidths}
//       createFormInitialValues={initialValues(Number(projectId))}
//     />
//   );
// };



import { TableWithModal } from "components/PLAYGROUND/TableWithModal"
import { formConfig } from "./formConfig"
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";
import { tableConfig } from "./tableConfig";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { IFormControls } from "types";



export const DeliverablesSection = () => {
  const { projectId } = useParams();

  const tableData = useFormatTableData(`projects/${projectId}/deliverables`);

  const { ModalToggleCell, selectedRow } = useRenderTableCell();

  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/deliverables/${formControls.currentRowData?.id}`,
    tableName: "project_deliverable",
  });
  console.log("rendered");
  
  return <TableWithModal tableConfig={tableConfig()} tableData={tableData} formControls={formControls} formConfig={formConfig(formData)} formData={formData} />
}