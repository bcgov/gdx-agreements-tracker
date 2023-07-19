// import React, { FC } from "react";
// import { readFields, editFields } from "./fields";
// import { TableComplete } from "components/TableComplete";

// export const Ministries: FC = () => {
//   const createFormInitialValues = {
//     ministry_name: "",
//     ministry_short_name: "",
//     is_active: false,
//   };

//   const roles = {
//     get: "admin_form_read_all",
//     add: "admin_form_add_one",
//     update: "admin_form_update_one",
//     delete: "admin_form_delete_one",
//   };

//   const url = {
//     getAll: `/ministries`,
//     getOne: `/ministries/{id}`,
//     updateOne: `/ministries/{id}`,
//     addOne: `/ministries`,
//   };
//   const columnWidths = {
//     "Ministry/Organization Name": 3,
//   };

//   return (
//     <TableComplete
//       itemName="Ministry"
//       tableName="ministry"
//       url={url}
//       columnWidths={columnWidths}
//       createFormInitialValues={createFormInitialValues}
//       readFields={readFields}
//       editFields={editFields}
//       roles={roles}
//     />
//   );
// };
import { TableWithModal } from "components/PLAYGROUND/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";

export const Ministries = () => {
  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"ministry"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/ministries`}
      formDataApiEndpoint={`/ministries/${formControls.currentRowData?.id}`}
    />
  );
};
