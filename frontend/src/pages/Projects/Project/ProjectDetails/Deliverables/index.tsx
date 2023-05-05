import { TableComplete } from "components/TableComplete";
import React from "react";



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



import {TableWithModal} from "components/PLAYGROUND/TableWithModal"
import { formFields } from "./formFields"
import { useFormData } from "hooks/useFormData";
import { TableConfig } from "./TableConfig";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { useParams } from "react-router-dom";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";
import { useFormControls } from "hooks";



export const DeliverablesSection = () => {
  const { projectId } = useParams();

  const formData = useFormData({
    url: `projects/deliverables/{id}`,
    tableName: "projects",
  });

  const tableData = useFormatTableData(`projects/${projectId}/deliverables`);

  const {
    handleEditMode,
    handleOpen,
    handleClose,
    handleCurrentRowData,
    handleFormType,
    formType,
    open,
    editMode,
    currentRowData,
  } = useFormControls();

  const { ModalToggleCell, selectedRow } = useRenderTableCell();

  const tableConfig = TableConfig()

  tableConfig.tableColumns[0].renderCell = ModalToggleCell

  // const apiEndPoint = {
  //   getAll: `projects/${projectId}/deliverables`,
  //   getOne: `projects/deliverables/{id}`,
  //   updateOne: `projects/deliverables/{id}`,
  //   addOne: `projects/deliverables`,
  // };

  // console.log('tableConfig', tableConfig)
  console.log('tableData', tableData)

  return <TableWithModal  />
}