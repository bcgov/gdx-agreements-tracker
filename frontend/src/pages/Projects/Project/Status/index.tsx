// import React, { FC } from "react";
// import { useParams } from "react-router-dom";
// import { TableComplete } from "components/TableComplete";
// import { projectStatusReadFields, projectStatusEditFields } from "./fields";
// /**
//  * The Amendments page
//  *
//  * @returns {JSX.Element} Amendments
//  */

// export const Status: FC = (): JSX.Element => {
//   /**
//    * returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
//    * reference: https://reactrouter.com/docs/en/v6/hooks/use-params
//    *
//    * @returns {string} projectId
//    */

//   const { projectId } = useParams();
//   const roles = {
//     get: "projects_read_all",
//     add: "projects_add_one",
//     update: "projects_update_one",
//     delete: "projects_delete_one",
//   };

//   const url = {
//     getAll: `projects/${projectId}/status`,
//     getOne: `projects/status/{id}`,
//     updateOne: `projects/status/{id}`,
//     addOne: `projects/status`,
//   };

//   const createFormInitialValues = {
//     identified_risk: "",
//     forecast_and_next_steps: "",
//     issues_and_decisions: "",
//     general_progress_comments: "",
//     budget_health_id: "",
//     status_date: null,
//     schedule_health_id: "",
//     reported_by_contact_id: "",
//     health_id: "",
//     project_phase_id: "",
//     project_id: projectId,
//   };

//   const columnWidths = {
//     lesson: 3,
//     recommendations: 3,
//   };

//   return (
//     <>
//       <TableComplete
//         itemName="Status Summary"
//         tableName="project_status"
//         columnWidths={columnWidths}
//         url={url}
//         createFormInitialValues={createFormInitialValues}
//         readFields={projectStatusReadFields}
//         editFields={projectStatusEditFields}
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

export const Status = () => {
  const { projectId } = useParams();

  const tableData = useFormatTableData(`projects/${projectId}/status`);
  const formControls: IFormControls = useFormControls();

  const formData = useFormData({
    url: `/projects/status/${formControls.currentRowData?.id}`,
    tableName: "project_status",
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
