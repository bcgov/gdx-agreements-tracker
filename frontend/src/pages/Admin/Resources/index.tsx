import React, { FC } from "react";
import { editFields, readFields } from "./fields";
import { TableData } from "components/TableData";

export const Resources: FC = () => {
  const createFormInitialValues = {
    ministry_name: "",
    ministry_short_name: "",
    is_active: false,
  };

  const roles = {
    get: "admin_form_read_all",
    add: "admin_form_add_one",
    update: "admin_form_update_one",
    delete: "admin_form_delete_one",
  };

  const url = {
    getAll: `/resources`,
    getOne: `/resources/{id}`,
    updateOne: `/resources/{id}`,
    addOne: `/resources`,
  };

  return (
    <TableData
      itemName="Resource"
      tableName="resources"
      url={url}
      createFormInitialValues={createFormInitialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
