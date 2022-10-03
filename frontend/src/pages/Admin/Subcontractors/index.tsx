import { TableComplete } from "components/TableComplete";
import React, { FC } from "react";
import { readFields, editFields } from "./fields";

export const Subcontractors: FC = () => {
  const createFormInitialValues = {
    subcontractor_name: "",
  };

  const roles = {
    get: "admin_form_read_all",
    add: "admin_form_add_one",
    update: "admin_form_update_one",
    delete: "admin_form_delete_one",
  };

  const url = {
    getAll: `/subcontractors`,
    getOne: `/subcontractors/{id}`,
    updateOne: `/subcontractors/{id}`,
    addOne: `/subcontractors`,
  };

  return (
    <TableComplete
      itemName="Subcontractor"
      tableName="subcontractors"
      url={url}
      createFormInitialValues={createFormInitialValues}
      readFields={readFields}
      editFields={editFields}
      roles={roles}
    />
  );
};
