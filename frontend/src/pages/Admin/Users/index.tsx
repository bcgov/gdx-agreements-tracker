import React, { FC } from "react";
import { editFields, readFields } from "./fields";
import { TableComplete } from "components/TableComplete";

export const Users: FC = () => {
  const createFormInitialValues = {
    subcontractor_name: "",
  };

  const roles = {
    get: "admin_form_read_all",
    add: "users_add_one",
    update: "users_update_one",
    delete: "users_delete_one",
  };

  const url = {
    getAll: `/users`,
    getOne: `/users/{id}`,
    updateOne: `/users/{id}`,
    addOne: `/users`,
  };

  const columnWidths = {
    name: 2,
    email: 2,
  };

  return (
    <TableComplete
      itemName="User"
      tableName="users"
      columnWidths={columnWidths}
      url={url}
      createFormInitialValues={createFormInitialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
